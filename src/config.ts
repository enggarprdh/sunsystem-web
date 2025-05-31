
export interface ConfigProps {
    apiUrl: string;
    
}

const Config = (): ConfigProps => {
    if (process.env.NODE_ENV !== 'production') {
        return {
            apiUrl: 'https://localhost:7294/api',
        };
    } else {
        return {
            apiUrl: 'https://api.example.com',
        };
    }
}

export default Config;