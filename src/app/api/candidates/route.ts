const API_KEY = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY;
const headers = {
  'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
  'Content-Type': 'application/json',
  'On-Behalf-Of': '4280249007'
};

export async function POST(request: Request) {
    try {
        const requestBody = await request.json();

        const response = await fetch("https://harvest.greenhouse.io/v1/candidates", {
            method: "POST",
            headers,
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Greenhouse API error details:', errorBody);
            throw new Error(`Failed: ${response.status} ${response.statusText}`);
        }

        await response.json();
        return Response.json(
            { message: 'Application submitted successfully' },
            { status: 200 }
        );
  } catch (error) {
        console.error('Error submitting application:', error);
        return Response.json(
        { error: 'Failed to submit application' },
        { status: 500 }
        );
    }
}