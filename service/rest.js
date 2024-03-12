export class Rest {

    constructor() {
        this.baseUrl = 'http://migueljaque.com/puzzle/api.php';
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    // async sacarDatosImagenes(dim, img) {
    //     try {
    //         const url = `${this.baseUrl}`;
    //         const bodyData = JSON.stringify({ dim, img });
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: this.headers,
    //             mode: 'cors',
    //             body: bodyData,
    //         });
    
    //         return this.handleResponse(response);
    //     } catch (error) {
    //         console.error('Error:', error);
    //         return null;
    //     }
    // }

    async sacarDatosImagenes(dim, img) {
        try {
            const url = `${this.baseUrl}?dim=${dim}&fichero=${img}.jpg`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers,
                mode: 'cors'
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }
    

    async handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const responseBodyText = await response.text();
    
        try {
            // Intenta parsear la respuesta como JSON
            const responseBody = JSON.parse(responseBodyText);
            return responseBody;
        } catch (error) {
            return responseBodyText;
        }
    }

}