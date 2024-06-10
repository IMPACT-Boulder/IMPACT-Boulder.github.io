import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

// Define a type for the incoming socket data
type ScriptActionData = {
    status: string;
    message: string;
};

const ScriptStatus: React.FC = () => {
    const [status, setStatus] = useState<string>('Awaiting updates...');
    const backendUrl: string = 'http://your_backend_url:5000'; // Update with your actual backend URL and port

    useEffect(() => {
        const socket: Socket = io(backendUrl);

        socket.on('script_action', (data: ScriptActionData) => {
            console.log('Received:', data.status, data.message);
            setStatus(`Last status: ${data.status}, Message: ${data.message}`);
        });

        // Clean up the connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Script Status Notifications</h1>
            <p>{status}</p>
        </div>
    );
};

export default ScriptStatus;
