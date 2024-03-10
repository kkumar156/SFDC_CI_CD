@isTest
public with sharing class PA_TestDataUtility {
    /**
     * Fetches all required fields of an object along with test values for a single record.
     * 
     * @param objectApiName API name of the object.
     * @return SObject with required fields populated with test values.
     */
    public static SObject getRequiredFieldsWithTestValues(String objectApiName) {
        return populateFields(objectApiName, 1)[0];
    }
    
    /**
     * Fetches all required fields of an object along with test values for multiple records.
     * 
     * @param objectApiName API name of the object.
     * @param recordCount Number of records to be created.
     * @return List of SObjects with required fields populated with test values.
     */
    public static List<SObject> getRequiredFieldsWithTestValues(String objectApiName, Integer recordCount) {
        return populateFields(objectApiName, recordCount);
    }
    
    /**
     * Populates required fields of an object along with test values.
     * 
     * @param objectApiName API name of the object.
     * @return List of SObjects with required fields populated with test values.
     */
    private static List<SObject> populateFields(String objectApiName, Integer recordCount) {
        SObjectType objectType = Schema.getGlobalDescribe().get(objectApiName);
        if (objectType == null) {
            throw new IllegalArgumentException('Object not found: ' + objectApiName);
        }
        
        List<SObject> records = new List<SObject>();
        Map<String, Schema.SObjectField> fieldMap = objectType.getDescribe().fields.getMap();
        for (Integer i = 0; i < recordCount; i++) {
            SObject obj = objectType.newSObject();
            for (String fieldName : fieldMap.keySet()) {
                Schema.DescribeFieldResult fieldDescribe = fieldMap.get(fieldName).getDescribe();
                if (fieldDescribe.isCreateable() && !fieldDescribe.isNillable() && !fieldDescribe.isDefaultedOnCreate()) {
                    Object testValue = getTestValue(fieldDescribe, i);
                    obj.put(fieldName, testValue);
                }
            }
            records.add(obj);
        }
        return records;
    }
    
    /**
     * Returns a test value for a field based on its data type.
     * 
     * @param fieldDescribe Describe information of the field.
     * @param index Index for generating unique values.
     * @return Test value for the field.
     */
    private static Object getTestValue(Schema.DescribeFieldResult fieldDescribe, Integer index) {
        Schema.DisplayType fieldType = fieldDescribe.getType();
        
        switch on fieldType {
            when STRING {
                return 'Test ' + fieldDescribe.getLabel() + index;
            }
            when PICKLIST {
                List<Schema.PicklistEntry> picklistValues = fieldDescribe.getPicklistValues();
                return picklistValues.isEmpty() ? null : picklistValues[0].getValue();
            }
            when BOOLEAN {
                return true;
            }
            when DATE {
                return Date.today();
            }
            when DATETIME {
                return DateTime.now();
            }
            when CURRENCY {
                return 100.00;
            }
            when DOUBLE {
                return 100.0 + index;
            }
            when EMAIL {
                return 'test' + index + '@example.com';
            }
            when URL {
                return 'https://www.example' + index + '.com';
            }
            when else {
                return null;
            }
        }
    }
}