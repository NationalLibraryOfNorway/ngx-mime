Feature: Clear search query
  In order to start on a new search
  As a user 
  I want to clear the search query

  @desktop @android @iphone
  Scenario: Clear search query
    Given the viewer is opened with a publication
      And the viewer is in dashboard view
    When the user enters the word "Gjallarhorn" in the search query
     and the user click the empty search button
    Then the search query should be empty
