public without sharing class Form {

    
    @AuraEnabled(cacheable = true)
    public static List<Detail__c> getDetails()
    {
            return [SELECT Id, Name__c, Email__c, Phone__c, Age__c, Address__c FROM Detail__c  ORDER BY CreatedDate DESC
            LIMIT 1];
    }
}