class User {

    // Construtor da classe User, inicializa as propriedades do usuário
    constructor(name, gender, birth, country, email, password, photo, admin){
        this._id; 
        this._name = name; 
        this._gender = gender; 
        this._birth = birth; 
        this._country = country; 
        this._email = email; 
        this._password = password; 
        this._photo = photo; 
        this._admin = admin; 
        this._register = new Date(); 
    }

    //Getters para acessar as propriedades privadas
    get id(){
        return this._id;
    }

    get register(){
        return this._register;
    }

    get name(){
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get photo() {
        return this._photo;
    }

    get password() {
        return this._password;
    }

    get admin() {
        return this._admin;
    }

    set photo(value){
        this._photo = value;
    }

    //Método para carregar dados de um objeto JSON para a instância da classe
    loadFromJSON(json){
        for (let name in json){
            switch(name){
                case '_register':
                    this[name] = new Date(json[name]); 
                    break;
                default:
                    this[name] = json[name]; 
            }
        }
    }

    //Método estático para obter a lista de usuários armazenada no localStorage
    static getUsersStorage() {
        let users = [];
        if (localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users")); 
        }
        return users;
    }

    //Método para gerar um novo ID para o usuário
    getNewID(){
        let usersID = parseInt(localStorage.getItem("usersID")); 
        if (!usersID > 0) usersID = 0; 
        usersID++; 
        localStorage.setItem("usersID", usersID); 
        return usersID;
    }

    //Método para salvar o usuário no localStorage
    save(){
        let users = User.getUsersStorage();

        if (this.id > 0) {
            users.map(u=>{
                if (u._id == this.id) {
                    Object.assign(u, this); 
                }
                return u;
            });
        } else {
            this._id = this.getNewID();
            users.push(this);
        }

        localStorage.setItem("users", JSON.stringify(users));
    }

    //Método para remover o usuário do localStorage
    remove(){
        let users = User.getUsersStorage();
        users.forEach((userData, index)=>{
            if (this._id == userData._id) {
                users.splice(index, 1); 
            }
        });
        localStorage.setItem("users", JSON.stringify(users)); // Salva o array atualizado no localStorage
    }
}