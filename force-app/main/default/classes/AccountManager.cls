public with sharing class AccountManager {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer numberOfRecords) {
        return [SELECT Name, Phone, Website
                FROM Account
                LIMIT :numberOfRecords];
    }
}
