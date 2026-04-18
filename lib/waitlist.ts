const WAITLIST_API_URL = process.env.NEXT_PUBLIC_WAITLIST_API_URL;

/**
 * Submit email to waitlist via backend API.
 * @param {string} email
 * @param {string} [sourceFromUrl] - e.g. from ?source=reddit
 * @returns {{ ok: boolean, error?: string }}
 */
export async function submitToWaitlist(email: string, sourceFromUrl?: string): Promise<{ ok: boolean; error?: string }> {
    if (!WAITLIST_API_URL) {
        console.warn('NEXT_PUBLIC_WAITLIST_API_URL not set');
        return { ok: false, error: 'Missing API URL' };
    }

    const source = sourceFromUrl ? `pilotup.io, ${sourceFromUrl}` : 'pilotup.io';

    const body = {
        email: email.trim(),
        source,
        signedUpFor: 'waiting list',
    };

    try {
        const res = await fetch(WAITLIST_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            return { ok: false, error: data?.message || `Request failed (${res.status})` };
        }

        return { ok: true };
    } catch (err: any) {
        return { ok: false, error: err.message || 'Network error' };
    }
}
