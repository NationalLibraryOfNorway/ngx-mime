Feature: Show text
    To make it easier to read content when handwriting or font is difficult to read
    As a person
    Then I want the recognized text to appear

  Scenario: Enable textview
    Given the viewer is opened with a publication with recognized text
    When the viewer is in dashboard view
    Then the user should be able to enable textview

  Scenario: Show text
    Given the viewer is opened with a publication with recognized text
    And the viewer is in dashboard view
    When the user enables textview
    Then the text should be shown
