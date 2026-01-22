Feature: ToDo List

  Background:
    Given I navigate to "https://todo.testing.groupgti.com/"

  Scenario: Verify ToDo list sorted by Due date ascending order
    When I enter text content "ToDo list 1 current due date"
    And add current date
    And I click on Create Todo button
    When I enter text content "ToDo list 1 future due date"
    And I select a due date 4 days in the future
    And I click on Create Todo button
    When I enter text content "ToDo list 1 current due date"
    And I select a due date 7 days in the future
    And I click on Create Todo button
    When I enter text content "ToDo list 1 current due date"
    And I select a due date 2 days in the future
    And I click on Create Todo button
    Then ToDo list should be sorted by due date ascending order

  Scenario Outline: Add and Delete todo list item from table
    When I enter text content "ToDo list 2 current due date"
    And add current date
    And I click on Create Todo button
    Then I should be able to see "ToDo list 2 current due date" in ToDo item to list
    When I click on three-dot icon
    And click on Delete button
    Then the newly added "ToDo list 2 current due date" items should be removed

  Scenario Outline: Add and Archive todo list item from table Bug-06
    When I enter text content "ToDo list 3 current due date"
    And add current date
    And I click on Create Todo button
    Then I should be able to see "ToDo list 3 current due date" in ToDo item to list
    When I click on three-dot icon
    And click on Archive button
    Then the newly added "ToDo list 3 current due date" items should be removed
    And the newly added "ToDo list 3 current due date" items should be displayed under Archive list
