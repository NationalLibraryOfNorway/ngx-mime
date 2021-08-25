Feature: Show recognized text content
    To make it easier to read content when handwriting or font is difficult to read
    As a person
    Then I want the recognized text to appear

  Scenario: Enable recognized text content
    Given the viewer is opened with a publication with recognized text
    When the viewer is in dashboard view
    Then the user should be able to enable recognized text content

  Scenario: Show recognized text content
    Given the viewer is opened with a publication with recognized text
    And the viewer is in dashboard view
    When the user enables recognized text content
    Then the recognized text content should be shown
