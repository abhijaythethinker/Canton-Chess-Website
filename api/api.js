const USCF_MEMBER_API_BASE_URL = 'https://ratings-api.uschess.org/api/v1/members';
const USCF_LOOKUP_TIMEOUT_MS = 8000;
const TEMPORARY_UNAVAILABLE_MESSAGE =
    'US Chess lookup is temporarily unavailable. Please try again in a minute.';

function createLookupError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function normalizeUscfId(uscfId) {
    const normalizedId = String(uscfId ?? '').trim();
    return /^\d{8}$/.test(normalizedId) ? normalizedId : null;
}

async function lookupUscfMember(uscfId) {
    const normalizedId = normalizeUscfId(uscfId);

    if (!normalizedId) {
        throw createLookupError(400, 'USCF ID is required');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), USCF_LOOKUP_TIMEOUT_MS);

    let response;

    try {
        response = await fetch(
            `${USCF_MEMBER_API_BASE_URL}/${encodeURIComponent(normalizedId)}`,
            {
                headers: {
                    Accept: 'application/json',
                },
                signal: controller.signal,
            }
        );
    } catch (error) {
        if (error.name === 'AbortError') {
            throw createLookupError(504, TEMPORARY_UNAVAILABLE_MESSAGE);
        }

        throw createLookupError(502, TEMPORARY_UNAVAILABLE_MESSAGE);
    } finally {
        clearTimeout(timeoutId);
    }

    if (response.status === 404) {
        throw createLookupError(404, 'Player information not found');
    }

    if (!response.ok) {
        if (response.status === 429 || response.status >= 500) {
            throw createLookupError(503, TEMPORARY_UNAVAILABLE_MESSAGE);
        }

        throw createLookupError(502, 'Failed to fetch player information');
    }

    const member = await response.json();
    const playerName = [member.firstName, member.lastName].filter(Boolean).join(' ').trim();
    const expirationDate = member.expirationDate ?? null;

    if (!playerName && !expirationDate) {
        throw createLookupError(404, 'Player information not found');
    }

    return { playerName, expirationDate };
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { uscfId } = req.body ?? {};
        console.log(`Looking up USCF ID: ${uscfId}`);
        const result = await lookupUscfMember(uscfId);

        // Cache successful lookups to avoid repeated upstream requests.
        res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');

        console.log('Lookup result:', result);
        return res.json(result);

    } catch (error) {
        console.error('Error during member lookup:', error);
        return res.status(error.statusCode || 500).json({
            error: error.statusCode ? error.message : 'Failed to fetch player information',
        });
    }
}