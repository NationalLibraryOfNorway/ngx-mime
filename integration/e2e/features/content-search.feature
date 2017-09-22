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
    