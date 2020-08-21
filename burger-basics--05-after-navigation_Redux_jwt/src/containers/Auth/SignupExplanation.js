import React, { Component } from 'react'

export default class SignupExplanation extends Component {
    render() {
        return (
            <div>
                <table style={{width: '100%', border: '0px', margin: '0px', padding: '0px'}}>
<tbody><tr>
    <td style={{color: 'Red', textAlign: 'center', fontWeight: 'bold', height: '20px'}}>- ÖNEMLİ HATIRLATMA - </td>
  </tr>
  <tr>
    <td style={{paddingLeft: '40px'}}>
      <ul style={{lineHeight: '30px'}}>
        <li>Şifreniz yazmış olduğunuz E-Posta adresine gönderilecektir.</li>
        <li>İlan ve başvurularla ilgili duyurular E-Posta üzerinden yapılacağı için sık kullandığınız mail adresini kullanınız.</li>
        <li>Şifrenizi görebilmek için E-Posta adresinizin Spam Mail (istenmeyen E-posta veya önemsiz E-posta) kısımlarını da kontrol ediniz.</li>
      </ul>
    </td>
  </tr>
</tbody></table>
                
            </div>
        )
    }
}
