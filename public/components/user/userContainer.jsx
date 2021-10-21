
class UserContainer extends React.Component {

    constructor(props) {
        super(props); // Вызов конструктора предка

        let newUser = {
            name: "",
            email: "",
            password: "",
            password_confirm: ""
        };
        // Состояние компонента
        this.state = {
            session_id: null,
            error: null, // Состояние ошибки
            isEdit: false,
            isReg: false,
            isLogin: false,
            isLoaded: false, // Состояние загрузки
            user: newUser // Данные о пользователе
        }
    }

    updateSessionActivity(){
        fetch("/api/user/sessionUpdate",
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({_id: this.state.session_id})
            }
        )
            .then(response => {
                if (response.status != 200) {
                    console.log("Error Session update");
                }
            })
            .catch(err => {
                this.setState({error: err});
            });
    }

    componentDidMount(){
        let s = window.localStorage.getItem("session_id");
        if (s) {
            this.setState({
                session_id: s,
                isLogin : true
            });
            this.UpInterval =
                setInterval(this.updateSessionActivity.bind(this),5000);
        }
    }

    componentWillUnmount(){
        // alert(" Я забыл закрыть сессию!");
    }

    create(){
        fetch("/api/users",
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.user)
            }
        )
            .then(response => response.json())
            .then (item => {
                this.setState({
                    isReg:false,
                    user: null
                });
            })
            .catch(err => {
                this.setState({error: err});
            });
    }

    read(){}

    update(){}

    delete(){}

    doDeleteAccount(){

    }

    doOpenRegForm(){
        let newUser = {
            name: "",
            email: "",
            password: "",
            password_confirm: ""
        };
        this.setState({
            isReg: true,
            user: newUser
        });
    }

    tryReg() {
        // Проверить форму
        console.log("/api/user/testbyemail/" + this.state.user.email);
        fetch("/api/user/testbyemail/" + this.state.user.email)
            .then(response => response.text())
            .then (isHaving => {
                // console.log(isHaving);
                    if(isHaving == "true") {
                        console.log(" такой уже есть ");
                    } else {
                        console.log(" в базе такого нет - перехожу к записи в базу ");
                        this.create();
                    }
                })
            .catch(err => {
                this.setState({error: err});
            });

    }


    doOpenLoginForm(){}

    tryLogin() {
        fetch("/api/user/trylogin/" + this.state.user.email + "/" + this.state.user.password)
            .then(response => response.json())
            .then(session=> {
                console.log(session);
                if (session === false) {
                    this.setState({error: {message: "Login Error"}});
                    // Тут мы можем вообще анализировать и выводить состояние
                    // типа не верный логин пароль и тд
                } else {
                    this.setState({
                        session_id: session,
                        isLogin: true
                    });
                    window.localStorage.setItem("session_id", session);
                    this.UpInterval = setInterval(this.updateSessionActivity.bind(this),5000);
                }
            })
            /*.then (users => {
                console.log(users);
                if(users.length != 1 ){
                    console.log(" Что то не так в базе");
                    // Поведение, если нет пользователя
                } else {
                    this.setState({
                        isLogin: true,
                        user: users[0]
                    })
                }
            })
             */
            .catch(err => {
                this.setState({error: err});
            });
    }

    doOpenEditForm(){
    }

    doUpdate() {}


    doLogout() {
        // Удалить с сервера
        fetch("/api/user/sessionDelete",
            {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({_id: this.state.session_id})
            }
        )
            .then(response => {
                if (response.status != 200) {
                    console.log("Error Session close");
                }else {
                    clearInterval( this.UpInterval );
                    this.setState({
                        session_id: null,
                        isLogin: false
                    })

                }
            })
            .catch(err => {
                this.setState({error: err});
            });

        // Удалить с клиента
        localStorage.removeItem("session_id");
    }


    onChange(el){
        // тут формируется оперативная реакция системы на ввод пользователя
        const user = this.state.user;
        user[el.target.name]= el.target.value;
        this.setState({user: user});
    }

    renderRegisterForm(){
        return(
            <div>
                <form className="form-horizontal">
                    <fieldset>
                        <div id="legend">
                            <legend className="">Register</legend>
                        </div>
                        <div className="control-group">
                            <label className="control-label" htmlFor="name">Username</label>
                            <div className="controls">
                                <input onChange={this.onChange.bind(this)} type="text" id="name" name="name" placeholder=""  className="input-xlarge" />
                                    <p className="help-block">Username can contain any letters or numbers, without
                                        spaces</p>
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="email">E-mail</label>
                            <div className="controls">
                                <input onChange={this.onChange.bind(this)}  type="text" id="email" name="email" placeholder="" className="input-xlarge" />
                                    <p className="help-block">Please provide your E-mail</p>
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="password">Password</label>
                            <div className="controls">
                                <input onChange={this.onChange.bind(this)}  type="password" id="password" name="password" placeholder=""
                                       className="input-xlarge" />
                                    <p className="help-block">Password should be at least 4 characters</p>
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="password_confirm">Password (Confirm)</label>
                            <div className="controls">
                                <input onChange={this.onChange.bind(this)}  type="password" id="password_confirm" name="password_confirm" placeholder=""
                                       className="input-xlarge" />
                                    <p className="help-block">Please confirm password</p>
                            </div>
                        </div>

                        <div className="control-group">
                            <div className="controls">
                                <button className="btn btn-success" type="button" onClick={this.tryReg.bind(this)}>Register</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }

    doEdit(){
        this.setState({
            isEdit: true
        })
    }
    doExit(){
        this.setState({
            isEdit: false,
            isLogin: true
        })
    }
    renderEditForm(){
        return(
            <div> Редактирование
                <br/>
                <label style={{marginLeft: 5+'px'}} htmlFor="">Email</label>
                <input style={{marginLeft: 5+'px'}} type="text"/>
                <label style={{marginLeft: 5+'px'}} htmlFor="">Password</label>
                <input style={{marginLeft: 5+'px'}} type="text"/>
                <button style={{marginLeft: 5+'px'}} className="btn btn-success" onClick={this.doExit.bind(this)}>Submit</button>
                <button style={{marginLeft: 5+'px'}} className="btn btn-success" onClick={this.doExit.bind(this)}>Exit</button>
            </div>
        )
    }

    renderLoginForm(){
        return(
            <div>
                <div>
                    <form className="form-horizontal">
                        <fieldset>
                            <div id="legend">
                                <legend className="">Login</legend>
                            </div>


                            <div className="control-group">
                                <label className="control-label" htmlFor="email">E-mail</label>
                                <div className="controls">
                                    <input onChange={this.onChange.bind(this)}  type="text" id="email" name="email" placeholder="" className="input-xlarge" />
                                    <p className="help-block">Please provide your E-mail</p>
                                </div>
                            </div>

                            <div className="control-group">
                                <label className="control-label" htmlFor="password">Password</label>
                                <div className="controls">
                                    <input onChange={this.onChange.bind(this)}  type="password" id="password" name="password" placeholder=""
                                           className="input-xlarge" />
                                    <p className="help-block">Password should be at least 4 characters</p>
                                </div>
                            </div>

                            <div className="control-group">
                                <div className="controls">
                                    <button className="btn btn-success" type="button" onClick={this.tryLogin.bind(this)}>Login</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <button style={{marginTop: 5+'px'}} className="btn btn-success" onClick={this.doOpenRegForm.bind(this)}> Registration </button>
            </div>
        )
    }

    renderWelcome(){
        return(
            <div> WELCOME!!!
                <br/>
                <button className="btn btn-success" onClick={this.doLogout.bind(this)}> Logout </button>
                <button style={{marginLeft: 5+'px'}} className="btn btn-success" onClick={this.doEdit.bind(this)}> Edit Account </button>
                <button style={{marginLeft: 5+'px'}} className="btn btn-success" onClick={this.doLogout.bind(this)}> Delete Account </button>
            </div>
        )
    }

    render(){
        if(this.state.error) return this.renderError();
        if(this.state.isReg) return this.renderRegisterForm();
        if(this.state.isEdit) return this.renderEditForm();
        if(this.state.isLogin) return this.renderWelcome();
        return this.renderLoginForm();
    }

    // Компонент в состоянии загрузки
    renderLoading(){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
    }

    // Отображение компонента в состоянии ошибки
    renderError(){
        return (
            <div className="alert alert-danger" role="alert">
                Error: {this.state.error.message}
            </div>
        );
    }

}