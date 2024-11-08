import axios, {AxiosInstance} from 'axios';

class ApiService 
{
    private axiosInstance : AxiosInstance;
    
    constructor()
    {
        this.axiosInstance = axios.create({
            baseURL: 'https://localhost:7101/api/',
            headers: {
                'Content-Type':'application/json'
            }
        })
    }

    public async getData<T>(endpoint:string ): Promise<T>
    {
        try
        {
            const response = await this.axiosInstance.get<T>(endpoint);
            return response.data;
        }
        catch(error)
        {
            console.error('ERROR AL TRAER DATOS EN',error);
            throw error;
        }
    }

    public async postData<T>(endpoint: string, data: T): Promise<T> {
        try {
            const response = await this.axiosInstance.post<T>(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('ERROR AL ENVIAR DATOS A', endpoint, error);
            throw error;
        }
    }
    
}

export default new ApiService();