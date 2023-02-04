@isTest
public class helloWorld_Test {

    @isTest
    public static void helloWorldTest(){
        String helloWorld = helloWorld.printHelloWorld();
        System.assertEquals('Hello World',helloWorld, 'Assertion has failed.');
    }
}