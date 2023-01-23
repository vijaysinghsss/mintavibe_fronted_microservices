import React from 'react'

const CheckoutPayment = () => {
    return (
        <div className="pop-div pop-width" id="Kyc-detail-modal">
            <div className="close-button close_modal">
                <button className="modal__close md_cls" type="button">
                    <img alt="" src="/assets/cross-button.svg" /></button></div>
            <h2>Fill in your Details</h2>
            <form id="kycDetailCreateForm" className="inline inline-pop" enctype="multipart/form-data" action="/kyc_detail" accept-charset="UTF-8" data-remote="true" method="post">
                <input type="hidden" name="authenticity_token" value="Eo0XvVNoNRHkoSCGi0CDXeGvGOvggn6pNxtdY08NudQo2ZQK63qjv5vPuPZiVwNuiR7amMxsS8bS39Y-xx3QhA" />
                <div className="input-icons">
                    <i className="fa fa-flag select-icons" aria-hidden="true" ></i>
                    <p>Select Country*</p>
                    <select className="select-field" id="country" name="kyc_detail[country_code]">
                        <option value="ZZ">Select a country</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AX">Åland Islands</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AS">American Samoa</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AW">Aruba</option>
                        <option value="AC">Ascension Island</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermuda</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia</option>
                        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BR">Brazil</option>
                        <option value="IO">British Indian Ocean Territory</option>
                        <option value="BN">Brunei Darussalam</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="MM">Burma</option>
                        <option value="BI">Burundi</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CV">Cape Verde</option>
                        <option value="KY">Cayman Islands</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CX">Christmas Island</option>
                        <option value="CC">Cocos (Keeling) Islands</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo</option>
                        <option value="CD">Congo, Democratic Republic of the</option>
                        <option value="CK">Cook Islands</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CI">Cote d'Ivoire</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CW">Curaçao</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FK">Falkland Islands</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FM">Federated States of Micronesia</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GF">French Guiana</option>
                        <option value="PF">French Polynesia</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GR">Greece</option>
                        <option value="GL">Greenland</option>
                        <option value="GD">Grenada</option>
                        <option value="GP">Guadeloupe</option>
                        <option value="GU">Guam</option>
                        <option value="GT">Guatemala</option>
                        <option value="GG">Guernsey</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="VA">Holy See (Vatican City State)</option>
                        <option value="HN">Honduras</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IM">Isle of Man</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JE">Jersey</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="XK">Kosovo</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Laos</option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MO">Macao</option>
                        <option value="MG">Madagascar</option>
                    </select>
                    <p>Name*</p>
                    <i className="fa fa-user icon"></i>
                    <input onkeydown="return /[a-zA-Z ]/i.test(event.key)" className="input-field" type="text" placeholder="Enter Name" id="name" name="kyc_detail[name]" required="" />
                    <p>Email ID*</p>
                    <i className="fa fa-envelope icon"></i>
                    <input className="input-field" type="text" placeholder="Enter Email" id="email_id" name="kyc_detail[email_id]" required="" />
                    <p>Mobile Number*</p>
                    <i className="fa fa-mobile icon" ></i>
                    <div id="mobile_number">
                        <div data-react-class="collections/mobileNum" data-react-props="{}" data-react-cache-id="collections/mobileNum-0">
                            <div className="PhoneInput"><div className="PhoneInputCountry">
                                <select aria-label="Phone number country" className="PhoneInputCountrySelect">
                                    <option value="ZZ">International</option>
                                    <option value="AF">Afghanistan</option>
                                    <option value="AX">Åland Islands</option>
                                    <option value="AL">Albania</option>
                                    <option value="DZ">Algeria</option>
                                    <option value="AS">American Samoa</option>
                                    <option value="AD">Andorra</option>
                                    <option value="AO">Angola</option>
                                    <option value="AI">Anguilla</option>
                                    <option value="AG">Antigua and Barbuda</option>
                                    <option value="AR">Argentina</option>
                                    <option value="AM">Armenia</option>
                                    <option value="AW">Aruba</option>
                                    <option value="AC">Ascension Island</option>
                                    <option value="AU">Australia</option>
                                    <option value="AT">Austria</option>
                                    <option value="AZ">Azerbaijan</option>
                                    <option value="BS">Bahamas</option>
                                    <option value="BH">Bahrain</option>
                                    <option value="BD">Bangladesh</option>
                                    <option value="BB">Barbados</option>
                                    <option value="BY">Belarus</option>
                                    <option value="BE">Belgium</option>
                                    <option value="BZ">Belize</option>
                                    <option value="BJ">Benin</option>
                                    <option value="BM">Bermuda</option>
                                    <option value="BT">Bhutan</option>
                                    <option value="BO">Bolivia</option>
                                    <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                    <option value="BA">Bosnia and Herzegovina</option>
                                    <option value="BW">Botswana</option>
                                    <option value="BR">Brazil</option>
                                    <option value="IO">British Indian Ocean Territory</option>
                                    <option value="BN">Brunei Darussalam</option>
                                    <option value="BG">Bulgaria</option>
                                    <option value="BF">Burkina Faso</option>
                                    <option value="BI">Burundi</option>
                                    <option value="KH">Cambodia</option>
                                    <option value="CM">Cameroon</option>
                                    <option value="CA">Canada</option>
                                    <option value="CV">Cape Verde</option>
                                    <option value="KY">Cayman Islands</option>
                                    <option value="CF">Central African Republic</option>
                                    <option value="TD">Chad</option>
                                    <option value="CL">Chile</option>
                                    <option value="CN">China</option>
                                    <option value="CX">Christmas Island</option>
                                    <option value="CC">Cocos (Keeling) Islands</option>
                                    <option value="CO">Colombia</option>
                                    <option value="KM">Comoros</option>
                                    <option value="CG">Congo</option>
                                    <option value="CD">Congo, Democratic Republic of the</option>

                                </select>
                                <div aria-hidden="true" className="PhoneInputCountryIcon PhoneInputCountryIcon--border">
                                    <img className="PhoneInputCountryIconImg" alt="India" src="https://purecatamphetamine.github.io/country-flag-icons/3x2/IN.svg" />
                                </div><div className="PhoneInputCountrySelectArrow">
                                </div>
                            </div>
                                <input type="tel" autocomplete="tel" placeholder="Enter your mobile number" className="PhoneInputInput" value="" id="mobile_no" name="kyc_detail[mobile_no]" />
                            </div>
                        </div>
                    </div>
                    <p>Address*</p>
                    <i className="fa fa-lock icon"></i>
                    <input onkeypress="return blockSpecialChar(event)" className="input-field" type="text" placeholder="Enter Address" id="address" name="kyc_detail[address]" required="" />
                    <p>Wallet Address</p>
                    <i className="fa-solid fa-wallet icon"><img src="../../assets/landing_page/wallet.png" className="mini-wallet-icon" /></i>
                    <input className="input-field wallet-input-box" type="text" placeholder="rD7qt9U6SAWtbtoLe7KJ7ZDsZCHtmHqQ8z" readonly="" />
                    <input type="submit" name="commit" value="Create" className="sign__btn hide" id="submitKycDetail" data-disable-with="Create" />
                    <div className="creat-button"><a href="javascript:void(0)" role="button" id="kyc-submit">Proceed</a></div>
                </div>

            </form>
        </div>
    )
}

export default CheckoutPayment