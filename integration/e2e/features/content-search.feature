@android @iphone @desktop 
Feature: Content search 
  In order to find specific content inside a publication 
  As a user 
  I want to search for text in the publication

  Scenario: Search with hits 
    Given the viewer is opened with a publication with the word "Gjallarhorn" 5 times inside 
      And the viewer is in dashboard view
    When the user search for the word "Gjallarhorn" 
    Then there are 5 results found 
    And the word "Gjallarhorn" should be highlighted 

  Scenario: Search with no hits 
    Given the viewer is opened with a publication without the word "Heimdall" 
      And the viewer is in dashboard view
    When the user search for the word "Heimdall" 
    Then there are no results found

  Scenario: Go to search hit
    Given the viewer is opened with a publication with the word "Gjallarhorn" 5 times inside 
      And the viewer is in dashboard view
    When the user search for the word "Gjallarhorn" 
     And the user selects the first hit
    Then the content of hit number 1 should be displayed

  Scenario: Go to next search hit
    Given the viewer is opened with a publication with the word "Gjallarhorn" 5 times inside 
      And the viewer is in dashboard view
      And the user search for the word "Gjallarhorn"
      And the user has selected the second hit
    When the user select the next hit button
    Then the content of hit number 3 should be displayed

  Scenario: Go to previous search hit
    Given the viewer is opened with a publication with the word "Gjallarhorn" 5 times inside 
      And the viewer is in dashboard view
      And the user search for the word "Gjallarhorn"
      And the user has selected the second hit
    When the user select the previous hit button
    Then the content of hit number 1 should be displayed
