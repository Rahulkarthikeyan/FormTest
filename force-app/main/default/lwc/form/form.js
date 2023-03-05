import { LightningElement} from 'lwc';
import getFormList from '@salesforce/apex/Form.getDetails';
import {
    createRecord
} from "lightning/uiRecordApi";
import DETAIL_OBJECT from '@salesforce/schema/Detail__c';
import NAME_FIELD from "@salesforce/schema/Detail__c.Name__c";
import EMAIL_FIELD from "@salesforce/schema/Detail__c.Email__c";
import PHONE_FIELD from "@salesforce/schema/Detail__c.Phone__c";
import AGE_FIELD from "@salesforce/schema/Detail__c.Age__c";
import ADDRESS_FIELD from "@salesforce/schema/Detail__c.Address__c";

export default class BikeCard extends LightningElement {
   
        name;
        email;
        phone;
        age;
        address;
        pictureUrl = 'https://logodix.com/logo/86351.png';

        connectedCallback() {
            this.getApplicationFetch();
        }

        handleNameChange(event) {
            this.name = event.target.value;
        }

        handleEmailChange(event) {
            this.email = event.target.value;
        }

        handlePhoneChange(event) {
            this.phone = event.target.value;
        }

        handleAgeChange(event) {
            this.age = event.target.value;
        }

        handleAddressChange(event) {
            this.address = event.target.value;
        }


        getApplicationFetch() {
            getFormList().then(res => {
                if (res.length > 0) {
                    this.name = res[0] && res[0][NAME_FIELD.fieldApiName];
                    this.email = res[0] && res[0][EMAIL_FIELD.fieldApiName];
                    this.phone = res[0] && res[0][PHONE_FIELD.fieldApiName];
                    this.age = res[0] && res[0][AGE_FIELD.fieldApiName];
                    this.address = res[0] && res[0][ADDRESS_FIELD.fieldApiName];
                   
                }
            }).catch(errors => {
               
            });
        }
        handleSave() {
            console.log('test');
            if (!this.name || !this.email || !this.phone || !this.age || !this.address) {
                
                alert('Please fill in all required fields.');
                return;
            }
            console.log(this.name,this.address);
            let fields = {};
            fields[NAME_FIELD.fieldApiName] = this.name;
            fields[EMAIL_FIELD.fieldApiName] = this.email;
            fields[PHONE_FIELD.fieldApiName] = this.phone;
            fields[AGE_FIELD.fieldApiName] = this.age;
            fields[ADDRESS_FIELD.fieldApiName] = this.address;
            const recordInput = {
                apiName: DETAIL_OBJECT.objectApiName,
                fields
            };
            createRecord(recordInput)
                .then((result) => {
                    alert('Saved successfully');
                   
                }).catch(error => {
                    console.log(error,'err');
                       alert('Error in saving');
                })
    
        }
    }
