Feature: Verify ToDo content textbox and Due date scenario related to Acceptance 1

  Background:
    Given I navigate to "https://todo.testing.groupgti.com/"

  Scenario: Verify Page load
    Then I should be able to see dashborad page

  Scenario: Verify ToDO content is mandatory
    Given I click on ToDo content textbox
    Then I should see "content" error message

  Scenario Outline: Verify Valid length and type of characters for ToDo content textbox
    Given I click on ToDo content textbox
    When I enter text content "<Text>"
    And I click on Create Todo button
    Then I should be able to see "<Text>" in ToDo item to list

    Examples:
      | Text                                                                                                 |
      | Less than 100 characters                                                                             |
      | Apart from counting words and characters, our online editor can help you to improve word choice and1 |
      | Ʌ6텨sС򖓉1󘏛Ǭ㏲ʵ́𐱋ࡴʪȇ󔐎b㩞񮳟餣ꠑ񪠊t鈅WSꧥ溨൭ႆ魽                                                              |
      # | @#$#^&*&(_)(_:>"L                                                                                    |

  Scenario: Verify I can add current date in Due date
    When I enter text content "ToDo list 1 current due date"
    And I click on Due date field
    And clear the Due date
    And add current date
    And I click on Create Todo button
    Then I should be able to see "ToDo list 1 current due date" in ToDo item to list

  Scenario: Verify I can add Future date in Due date
    When I enter text content "ToDo list due date is Future"
    And I click on Due date field
    And clear the Due date
    And I select a due date 4 days in the future
    And I click on Create Todo button
    Then I should be able to see "ToDo list due date is Future" in ToDo item to list

    
  Scenario: Create ToDo button should be disabled if Content and due date is blank
    When I enter text content ""
    And I click on Due date field
    And clear the Due date
    Then Create ToDo button should be disabled
    
    ###################################################################################################################################
#failed case as no error is displayed if we enter more than 100 characters

  Scenario: Verify invalid length of characters for ToDo content textbox - Bug-01
    Given I click on ToDo content textbox
    When I enter text content "Apart from counting words and characters, our online editor can help you to improve word choice and12345"
    And I click on Create Todo button
    Then I should see "max length" error message

  Scenario: Verify Due date is mandatory Bug-02
    Given I click on ToDo content textbox
    When I enter text content "ToDo list 1 without due date"
    And I click on Due date field
    And clear the Due date
    And I click on Create Todo button
    Then I should see "mandatory" error message

  Scenario: Verify I can add Past date in Due date Bug-03
    When I enter text content "ToDo list due date is Past"
    And I click on Due date field
    And clear the Due date
    And I select a due date 5 days in the past
    And I click on Create Todo button
    Then I should see "past date" error message


  Scenario: Create ToDo button should be disabled if we enter content and leave due date as blank Bug-04
    When I enter text content "ToDo list 1"
    And I click on Due date field
    And clear the Due date
    Then Create ToDo button should be disabled
