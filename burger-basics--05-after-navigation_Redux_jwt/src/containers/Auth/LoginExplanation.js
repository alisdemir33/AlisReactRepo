import React, { Component } from 'react'

export default class LoginExplanation extends Component {
    render() {
        return (
           
              
                    <table style={{width: '100%'}}>
                      <tbody><tr>
                          <td style={{color: 'Red', textAlign: 'center', fontWeight: 'bold', height: '35px', verticalAlign: 'middle'}}>- DUYURULAR - </td>
                        </tr>
                        <tr>
                          <td style={{paddingLeft: '40px', textAlign: 'left'}}>
                            <ul>                                
                              <li><h2><span style={{color: 'red'}} id="spanEl">Yeni</span></h2><h3><span id="spanText"><b>Sisteme kayıt olurken "Mail adresinize şifreniz gönderilemedi. Lütfen mail adresinizi kontrol edip tekrar deneyiniz." şeklinde hata alan başvuru sahipleri yukarıda yer alan "Şifrenizi mi unuttunuz ?" linkini kullanarak şifrenizin mail adresine yeniden gönderilmesini sağlamalıdır!</b></span></h3></li>
                              <li style={{lineHeight: '25px'}}>Üye olmak için "Yeni Üye" butonuna tıklayarak şifre alıp başvuruda bulunulbilmektedir</li>
                              <li style={{lineHeight: '25px'}}><h4>Sistemle ilgili yaşanan sorunlarda yardim.masasi@ailevecalisma.gov.tr adresine, sorunu gösteren ekran görüntüleri, sorunun detaylı açıklaması ve iletişim bilgileri eposta ile gönderilmelidir.
                                  Başvuruda yaşana teknik sorunlar dışında İlan ile ilgili sorularınız için(şartlar, belge teslim vs.), ilgili vakıf ile irtibata geçilmelidir.</h4></li>
                              <li style={{lineHeight: '25px'}}><h4>Hata bildirimi gönderilen epostada ilgili ekranın hata alınmadan hemen önceki ve hata alındıktan sonraki halinin gönderilmesi sorunlara doğru ve hızlı çözüm üretilmesi açısından önem arz etmektedir.</h4></li>
                              <li style={{lineHeight: '25px'}}><h4>Yardım Masası Telefon Numarası:  0 312 296 79 00 </h4></li>
                              <li style={{lineHeight: '15px', color: 'red'}}><h4>Hata Bildiriminde Bulunmadan Önce Kontrol Edilmesi Gereken ve Sıkça Yapılan Hatalar:</h4></li>
                              <li style={{lineHeight: '15px'}}><h5>Kimlik değişikliği yapılmış/başvurulmuş ve/veya geçici kimlik belgesi alınmış ise Ekranda yer alan"Yeni Kimlik Sahibiyim" seçilerek bu yeni alınan kimlik/belge üzerindeki seri no kullanılmalıdır.</h5></li>
                              <li style={{lineHeight: '15px'}}><h5>Şifre gönderilecek mail adresinin doğru girilmesi ve mail adresi içinde Türkçe Karakter(ç,ş,ğ,İ,ü,ö,Ç,Ğ,Ü,Ö,Ş) olmaması gerekmektedir.</h5></li>
                              <li style={{lineHeight: '15px'}}><h5>Seri Numarası içinde '0' rakamı ve/veya 'O' harfi geçiyor ise doğru harf/rakamın girilip girilmediğinin kontrolü önem arz etmektedir.</h5></li>
                              <li style={{lineHeight: '15px'}}><h5>Başvurulacak ilanda 'Aynı ilçede oturuyor olma' şartı olup olmadığı kontrol edilmelidir.İlanda bu şart var ise ikamet edilmeyen vakfın  ilanına başvuru yapılamamaktadır.</h5></li>
                              <li style={{lineHeight: '15px'}}><h5>Önlisans mezunları vakıf ilanlarına başvuruda bulunamamaktadır. Lisans Mezunu olarak olarak girilen KPSS sınavından alınan puan ile başvuru yapılabilmektdir.</h5></li>
                            </ul>
                          </td>
                        </tr>
                      </tbody></table>
                  );
                }
            }
              
    

