import React, { Component } from "react";
import { updateObject } from "../../shared/util";
import { checkValidity } from "../../shared/validityCheck";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./ApplyToAnnouncement.css";
//import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

 class ApplyToAnnouncement extends Component {
  constructor(props) {
    super(props);
    //   this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.toggleVisibility = this.toggleVisibility.bind(this);

    this.state = {
      aciklamaVisible: true,
      anno: null,
      // ilanNo: 0,
      // ilanOzet: "",
      loading: false,

      signUpForm: {
        egitimDurum: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "UNIVERSITE", displayValue: "ÜNİVERSİTE" },
              { value: "YUKSEK_LISANS", displayValue: "YÜKSEK LİSANS" },
              { value: "DOKTORA", displayValue: "DOKTORA" },
            ],
          },
          value: "fastest",
          validation: {},
          valid: true,
        },

        mezuniyetTarihi: {
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

        kpssYili: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "2019", displayValue: "2019" },
              { value: "2020", displayValue: "2020" },
            ],
          },
          value: "2019",
          validation: {},
          valid: true,
        },

        askerlikDurum: {
          elementType: "select",
          elementConfig: {
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

        bolum: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Bölüm",
          },
          value: "",
          touched: false,
          validation: {
            required: true,
            isNumeric: true,
          },
          valid: false,
        },

        kpssPuan: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "KPSS Puanı",
          },

          value: "",
          touched: false,
          validation: {
            required: true,
            isNumeric: false,
          },
          valid: false,
        },

        tecilTarihi: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Tecil Tarihi",
          },
          value: "",
          touched: false,
          validation: {
            required: true,
            isNumeric: false,
          },
          valid: false,
        },

        email: {
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
        cepTelefonu: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Cep Telefonu",
          },
          value: "",
          touched: false,
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
        },
        evTelefonu: {
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

        isTelefonu: {
          elementType: "email",
          elementConfig: {
            type: "text",
            placeholder: "İş Telefonu",
          },
          value: "",
          touched: false,
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
        },
      },
    };
  }

  componentDidMount() {
    console.log('COMPNENT DID MOUNT!!!')
    if (this.state.anno == null && this.props.location.state != null) {     
      this.setState({
        anno: this.props.location.state.annos,
      });
    }
  }

  toggleVisibility = () => {
    //this.setState({ aciklamaVisible: !this.state.aciklamaVisible });
    debugger;
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

  render() {
    let mainFormBody = <Spinner></Spinner>;
    let formWithElements = <Spinner></Spinner>;
    let ilanOzet;
    let bilgisayarBilgisiGerekli;
    let  bolumGerekli;
    let  dilGerekli;
    let  surucuBelgesiGerekli;
    let  ilGerekli;
    let  ilceGerekli;
    let  ilanDetayInfo=<div></div>;
    let  aciklama;

    const formElementsArray = [];
    for (let key in this.state.signUpForm) {
      formElementsArray.push({
        id: key,
        config: this.state.signUpForm[key],
      });
    }

    if (this.state.anno != null) {
      ilanOzet =
        this.state.anno.baslikField +
        " " +
        this.state.anno.cityField +
        "-" +
        this.state.anno.districtField +
        " / " +
        this.state.anno.unvanField +
        " (" +
        this.state.anno.calismaSekliField +
        ")";
    }
    debugger;
    if (this.state.anno != null && this.state.aciklamaVisible) {
      if (this.state.anno.bilgisayarBilgisiGerekliField) {
        bilgisayarBilgisiGerekli = (
          <li>{this.state.anno.bilgisayarBilgisiAciklamasiField}</li>
        );
      }

      if (this.state.anno.bolumGerekliField) {
        bolumGerekli = <li>{this.state.anno.bolumAciklamaField}</li>;
      }
      if (this.state.anno.dilGerekliField) {
        dilGerekli = <li>{this.state.anno.dilAciklamaField}</li>;
      }
      if (this.state.anno.surucuBelgesiGerekliField) {
        surucuBelgesiGerekli = (
          <li>{this.state.anno.surucuBelgesiGerekliField}</li>
        );
      }
      if (this.state.anno.ilGerekliField) {
        ilGerekli = <li>{this.state.anno.ilGerekliField}</li>;
      }
      if (this.state.anno.ilceGerekliField) {
        ilceGerekli = <li>{this.state.anno.ilceGerekliAciklamaField}</li>;
      }
      if (this.state.anno.ilceGerekliField) {
        ilceGerekli = <li>{this.state.anno.ilceGerekliAciklamaField}</li>;
      }
      if (this.state.anno.aciklamaField) {
        ilceGerekli = <li>{this.state.anno.aciklamaField}</li>;
      }
      debugger;
      if (this.state.aciklamaVisible) {
        ilanDetayInfo = (
          <div>
            <ul>
              {bilgisayarBilgisiGerekli}
              {bolumGerekli}
              {dilGerekli}
              {surucuBelgesiGerekli}
              {ilGerekli}
              {ilceGerekli}
              {aciklama}
            </ul>
          </div>
        );
      }
    }

    if (!this.state.loading) {
      formWithElements = formElementsArray.map((item) => {
        return (
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
          ></Input>
        );
      });

      mainFormBody = <div>{formWithElements}</div>;
    }

    let errorDiv = null;
    if (this.state.errorStatus) {
      errorDiv = <div>{this.state.message}</div>;
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
        <Button btnType="Success">KAYDET</Button>
        {errorDiv}
      </form>
    );

    return <div className={classes.ApplicationForm}>{form}</div>;
  }
}

export default ApplyToAnnouncement;