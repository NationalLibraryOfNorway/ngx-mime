@android @iphone @desktop
Feature: Clear content search
  In order remove the distraction of highlighted words 
  As a user 
  I want to remove highlighting from search results 

  Scenario: Clear search hits from search result navigator
    Given the viewer is opened with a publication with the word "Gjallarhorn" 45 times inside
      And the viewer is in dashboard view
      And the user search for the word "Gjallarhorn"
      And the user selects the first hit
    When the user select the clear hit button
    Then all highlighting should be removed 
      And the search result toolbar should be removed


  @desktop @android @iphone
  Scenario: Clear search hits from clear search input button
    Given the viewer is opened with a publication with the word "Gjallarhorn" 45 times inside
      And the viewer is in dashboard view
      And the user has search for the word "Gjallarhorn"
    When the user click the search inputs clear button
    Then the search query should be empty

