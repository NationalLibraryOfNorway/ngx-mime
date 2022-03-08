@desktop
Feature: Show recognized text content
    To make it easier to read content when handwriting or font is difficult to read
    As a person
    Then I want the recognized text content to appear

  Scenario: Enable recognized text content
    Given the viewer is opened with a publication with recognized text content
    When the viewer is in dashboard view
    Then the user should be able to enable recognized text content

  Scenario: Show recognized text content
    Given the viewer is opened with a publication with recognized text content
    And the viewer is in dashboard view
    When the user enables recognized text content
    Then the recognized text content should be shown

  Scenario: Highlight recognized text content 
    Given the viewer is opened with a publication with recognized text content 
    And the viewer is in dashboard view
    When the user search for the word "that"
    And the user closes the search dialog
    And the user enables recognized text content
    Then the word "that" should be highlighted in the recognized text
