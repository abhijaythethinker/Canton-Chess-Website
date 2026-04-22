import { lookupUscfMember } from '../lib/uscf.js';

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