import React, { Component } from "react";
import { updateObject } from "../../shared/util";
import { checkValidity } from "../../shared/validityCheck";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./ApplyToAnnouncement.css";
import axios from "axios";
import { connect } from 'react-redux';
//import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class ApplyToAnnouncement extends Component {
  
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.saveApplicationHandler=this.saveApplicationHandler.bind(this);
  }
    //   this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
   

    state = {
      aciklamaVisible: true,
      announcement: null,
      message:null,
      // ilanNo: 0,
      // ilanOzet: "",
      loading: false,

      signUpForm: {
        EgitimDurumu: {
          elementType: "select",
          elementConfig: {
            placeholder: "Mezuniyet",
            options: [
              { value: "UNIVERSITE", displayValue: "ÜNİVERSİTE" },
              { value: "YUKSEK_LISANS", displayValue: "YÜKSEK LİSANS" },
              { value: "DOKTORA", displayValue: "DOKTORA" },
            ],
          },
          value: "UNIVERSITE",
          validation: {},
          valid: true,
        },

        MezuniyetTarihi: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Mezuniyet Tarihi",
          },

          value: "",
          touched: false,
          validation: {
            required: true,
            isNumeric: false,
          },
          valid: false,
        },

        KpssGirisYili: {
          elementType: "select",
          elementConfig: {
            placeholder: "KPSS Yılı",
            options: [
              { value: "2014", displayValue: "2014" },
              { value: "2020", displayValue: "2020" },
            ],
          },
          value: "2014",
          validation: {},
          valid: true,
        },

        AskerlikDurumu: {
          elementType: "select",
          elementConfig: {
            placeholder: "Askerlik Durumu",
            options: [
              { value: "MUAF", displayValue: "MUAF" },
              { value: "YAPTI", displayValue: "YAPTI" },
              { value: "TECILLI", displayValue: "TECİLLİ" },
              { value: "GECERSIZ", displayValue: "GEÇERSİZ" },
            ],
          },
          value: "YAPTI",
          validation: {},
          valid: true,
        },

        UniversiteBolumu: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Bölüm",
          },
          value: "",
          touched: false,
          validation: {
            required: true,           
          },
          valid: false,
        },

        KpssPuani: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "KPSS Puanı",
          },

          value: "76,44835",
          touched: false,
          validation: {
            required: true,
            isDouble: true,
          },
          valid: false,
        },

        TecilTarihi: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Tecil Tarihi",
          },
          value: "",
          touched: false,
          validation: {
            required: false,
            isNumeric: false,
          },
          valid: false,
        },

        EPosta: {
          elementType: "email",
          elementConfig: {
            type: "text",
            placeholder: "E-Posta",
          },
          value: "",
          touched: false,
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
        },
        CepTelNumarasi: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Cep Telefonu",
          },
          value: "",
          touched: false,
          validation: {
            required: true,
            isNumeric: true,
          },
          valid: false,
        },
        EvTelNumarasi: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Ev Telefonu",
          },
          value: "",
          touched: false,
          validation: {
            required: true,
            isNumeric: false,
          },
          valid: false,
        },

        IsTelNumarasi: {
          elementType: "email",
          elementConfig: {
            type: "text",
            placeholder: "İş Telefonu",
          },
          value: "",
          touched: false,
          validation: {          
            isNumber: true,
          },
          valid: false,
        },
      },    
  }

  componentDidMount() {
    console.log("COMPNENT DID MOUNT!!!");
    if (this.state.announcement == null && this.props.location.state != null) {
   ;debugger
      this.setState({
        announcement: this.props.location.state.announcement
      });
    }
  }

  toggleVisibility = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      aciklamaVisible: !prevState.aciklamaVisible,
    }));
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const clonedFormElement = updateObject(
      this.state.signUpForm[inputIdentifier],
      {
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          this.state.signUpForm[inputIdentifier].validation
        ),
      }
    );

    const formCopy = updateObject(this.state.signUpForm, {
      [inputIdentifier]: clonedFormElement,
    });

    let formIsValid = true;
    for (let identifier in formCopy) {
      if (!formCopy[identifier].valid) {
        formIsValid = false;
      }
    }
    this.setState({ signUpForm: formCopy, formIsValid: formIsValid });
  };

  saveApplicationHandler = (event) => {
    
    ;debugger
    event.preventDefault();

    this.setState({ loading: true });

   // let s=this.state.announcement;

    const formData = {};
    for (let formElemIdentifier in this.state.signUpForm) {
      formData[formElemIdentifier] = this.state.signUpForm[
        formElemIdentifier
      ].value;
    }
    //personelalim db insert için
    formData['IlanID']=this.state.announcement.iseAlimTalebiNoField;
    formData['IlanIlID']=this.state.announcement.ilanIlID;
    formData['IlanIlceID']=this.state.announcement.ilanIlceID;
    formData['UnvanID']=this.state.announcement.unvanField; 
    formData['PersonelID']='0';//redux...
    formData['BasvuruNo']=////insert olduğu için 0 giriyoruz; güncelleme olur ise 0 dan farklı olacak'234234';   
   
    formData['Ip']='127.0.0.1';

    //web servise göndermek için
    formData['TcKimlikNo']=this.props.user.tcKimlikNo; //redux
    formData['Ad']=this.props.user.name;//redux
    formData['Soyad']= this.props.user.surname;//'Soyadfromrdx';//redux
    formData['Cinsiyet']= this.props.user.cinsiyet;//'rdxCinsiyet';  //redux
    formData['DogumTarihi']= new Date(this.props.user.dogumTarihi);// new Date('10.10.2033'); //redux
    formData['DogumYeri']= this.props.user.dogumYeri; //'trss';    //redux
    formData['MedeniDurumu']= this.props.user.medeniDurumu;//'bekar';//redux


    //redux store dan formda olmayan kişi bilgileri alınıp form dataya eklenecek...

    let url = "https://localhost:44384/sample/SaveApplication";

     const jwtConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
           Authorization: "Bearer " + localStorage.getItem("accessToken")//token.accessToken
        }
    };

    axios
      .post(url, formData, jwtConfig)
      .then((response) => {
        console.log(response);        
        this.setState({ loading: false , message:response.data.resultExplanation});
      })
      .catch((error) => {
        debugger;
        console.log(error);
        if (error.response != null || error.response !== undefined)
          this.setState({ errorStatus:true,  message: error.response.message, loading: false });      
        else 
          this.setState({ errorStatus:true, message : "Bağlantı Hatası:"+error, loading: false });
      });
  };

  render() {
    let mainFormBody = <Spinner></Spinner>;
    let formWithElements = <Spinner></Spinner>;
    let ilanOzet;
    let bilgisayarBilgisiGerekli;
    let bolumGerekli;
    let dilGerekli;
    let surucuBelgesiGerekli;
    let ilGerekli;
    let ilceGerekli;
    let ilanDetayInfo = <div></div>;
    let aciklama;


    const formElementsArray = [];
    for (let key in this.state.signUpForm) {
      formElementsArray.push({
        id: key,
        config: this.state.signUpForm[key],
      });
    }

    if (this.state.announcement != null) {
      ilanOzet = (
        <b>
          {this.state.announcement.baslikField}
          {this.state.announcement.cityField}- {this.state.announcement.districtField}/{" "}
          {this.state.announcement.unvanField}( {this.state.announcement.calismaSekliField})
        </b>
      );
    }
    

    if (this.state.announcement != null && this.state.aciklamaVisible) {
      
      if (this.state.announcement.bilgisayarBilgisiGerekliField) {
        bilgisayarBilgisiGerekli =<li>{this.state.announcement.bilgisayarBilgisiAciklamasiField}</li>        
      }
      if (this.state.announcement.bolumGerekliField) {
        bolumGerekli = <li>{this.state.announcement.bolumAciklamasiField}</li>;
      }
      if (this.state.announcement.dilGerekliField) {
        dilGerekli = <li>{this.state.announcement.dilAciklamasiField}</li>;
      }
      if (this.state.announcement.surucuBelgesiGerekliField) {
        surucuBelgesiGerekli =<li>{this.state.announcement.surucuBelgesiAciklamasiField}</li>        
      }
      if (this.state.announcement.ilGerekliField) {
        ilGerekli = <li>{this.state.announcement.ilGerekliField}</li>;
      }
      if (this.state.announcement.ilceGerekliField) {
        ilceGerekli = <li>{this.state.announcement.ilceGerekliField}</li>;
      }   
      if (this.state.announcement.aciklamaField) {
        aciklama = <div>
           <b> Açıklama Metni </b> <p>{this.state.announcement.aciklamaField}</p>;
        </div>
      }

      if (this.state.aciklamaVisible) {
        ilanDetayInfo = (
           
            <table>
            <tr>
                <td>
                    <h3>İlan Şartları</h3>
                </td>
                </tr>
                <tr>
                <td> <ul>
              {bilgisayarBilgisiGerekli}
              {bolumGerekli}
              {dilGerekli}
              {surucuBelgesiGerekli}
              {ilGerekli}
              {ilceGerekli}             
            </ul></td>            
            </tr>
            <tr><td> {aciklama}</td></tr>
        </table>
           
           
           
         
        );
      }
    }

    if (!this.state.loading) {
      formWithElements = formElementsArray.map((item) => {
        return (
            [<label>{item.config.elementConfig.placeholder}</label>,
            <Input
            key={item.id}
            invalid={!item.config.valid}
            touched={item.config.touched}
            elementType={item.config.elementType}
            elementConfig={item.config.elementConfig}
            customMsg={item.config.elementConfig.placeholder}
            value={item.config.value}
            shouldValidate={item.config.validation && item.config.touched}
            changed={(event) => this.inputChangedHandler(event, item.id)}
          ></Input>]
        );
      });

      mainFormBody = <div>{formWithElements}</div>;
    }

    let messageDiv = null;
    if (this.state.message!== null) {
      messageDiv = <div>{this.state.message}</div>;
    }
    let form = (
      <form onSubmit={this.signupHandler}>
        <div
          style={{
            margin: "5px 0px 20px 5px",
            width: "auto",
            backgroundColor: "#B72327",
            color: "White",
            padding: "5px 0px 5px 15px",
            textAlign: "center",
          }}
        >
          YENİ ÜYE KAYIT FORMU
        </div>
        {ilanOzet} 
        <Button clicked={this.toggleVisibility} btnType="Danger">
          Açıklamaları {this.state.aciklamaVisible ? "Gizle" : "Göster"}
        </Button>
        {ilanDetayInfo}
        {mainFormBody}
        <Button clicked={this.saveApplicationHandler} btnType="Success">KAYDET</Button>
        {messageDiv}
      </form>
    );

    return <div className={classes.ApplicationForm}>{form}</div>;
  }

}

const mapStateToProps = (state) => {
  return {   
    isAuthenticated: state.authReducer.user !== null,
    user:state.authReducer.user
  }
}

export default connect(mapStateToProps, null) ( withErrorHandler(ApplyToAnnouncement,axios));
