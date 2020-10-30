import axios from 'axios';

export const api = axios.create({ baseURL: 'https://admin.kozinhar.com/gera-json.php' });

