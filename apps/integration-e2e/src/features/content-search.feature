@content-search
Feature: Content search
  In order to find specific content inside a publication
  As a user
  I want to search for text in the publication

  @desktop @android @iphone
  Scenario: Search with hits
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    When the user search for the word "africa"
    Then there are 7 results found
    And the word "AFRICA" should be highlighted

  @desktop @android @iphone
  Scenario: Search with no hits
    Given the viewer is opened with a publication without the word "Heimdall"
    And the viewer is in dashboard view
    When the user search for the word "Heimdall"
    Then there are no results found

  @desktop @android @iphone
  Scenario: Go to search hit
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    When the user search for the word "africa"
    And the user selects the first hit
    Then the page with hit number 1 should be displayed

  @desktop @android @iphone
  Scenario: Go to next search hit
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    And the user search for the word "africa"
    And the user has selected the second hit
    When the user select the next hit button
    Then the page with hit number 3 should be displayed

  @desktop @android @iphone
  Scenario: Go to previous search hit
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    And the user search for the word "africa"
    And the user has selected the second hit
    When the user select the previous hit button
    Then the page with hit number 1 should be displayed

  @desktop @android @iphone
  Scenario: Go to next search hit on same page
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    And the user search for the word "africa"
    And the user has selected the fifth hit
    When the user select the next hit button
    Then the page with hit number 5 should be displayed
    And hit number 6 should be highlighted

  @desktop @android @iphone
  Scenario: Go to previous search hit on same page
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    And the user search for the word "africa"
    And the user has selected the sixth hit
    When the user select the previous hit button
    Then the page with hit number 6 should be displayed
    And hit number 5 should be highlighted

  @desktop
  Scenario: Mark selected hit
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    When the user search for the word "africa"
    And the user selects the first hit
    Then the hit should be marked

  @desktop
  Scenario: Mark and scroll to current hit when reopening search dialog
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    And the user has search for the word "africa"
    And the user has selected the last hit
    When the user closes the search dialog
    And the user opens the search dialog
    Then the hit should be marked
    And the hit should be visible

  @android @iphone
  Scenario: Mark and scroll to current hit when reopening search dialog
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    And the user has search for the word "africa"
    And the user has selected the last hit
    When the user opens the search dialog
    Then the hit should be marked
    And the hit should be visible
