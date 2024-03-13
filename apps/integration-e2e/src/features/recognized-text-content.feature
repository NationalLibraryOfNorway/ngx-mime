@show-recognized-text-content @desktop
Feature: Show recognized text content
    To make it easier to read content when handwriting or font is difficult to read
    As a person
    Then I want the recognized text content to appear

  Scenario: Enable recognized text content
    Given the viewer is opened with a publication with recognized text content
    And the viewer is in dashboard view
    Then the user should be able to enable recognized text content

  Scenario: Show digital pages and recognized text content in split view
    Given the viewer is opened with a publication with recognized text content
    And the viewer is in dashboard view
    When the user enables recognized text content in split view
    Then both the digital pages and the recognized text content should be shown

  Scenario: Show recognized text content only
    Given the viewer is opened with a publication with recognized text content
    And the viewer is in dashboard view
    When the user enables recognized text content only
    Then only the recognized text content should be shown

  Scenario: Hide recognized text content
    Given the viewer is opened with a publication with recognized text content
    And the viewer is in dashboard view
    And the user has enabled recognized text content only
    When the user closes the recognized text content
    Then the recognized text content should be hidden

  Scenario: Highlight recognized text content
    Given the viewer is opened with a publication with recognized text content
    And the viewer is in dashboard view
    When the user search for the word "that"
    And the user selects the first hit
    And the user closes the search dialog
    And the user enables recognized text content in split view
    Then the word "that" should be highlighted in the recognized text
