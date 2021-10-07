public with sharing class AccountManager {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Name, Phone, Website
                FROM Account
                LIMIT 10];
    }
}
