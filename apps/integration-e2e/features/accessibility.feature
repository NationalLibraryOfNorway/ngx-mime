@Accessibility
@android @iphone @desktop
Feature: Accessibility
  To have the same opportunity for use
  As a person with disabilities
  Then I want the viewer to be universally designed

  Scenario: Accessibility in page view
    Given the viewer is opened with a publication without attribution labels
    And the viewer is in dashboard view
    Then the viewer should meet all accessibility criteria

  Scenario: Accessibility in dashboard view
    Given the viewer is opened with a publication without attribution labels
    And the viewer is in page view
    Then the viewer should meet all accessibility criteria

  Scenario: Accessibility in attribution dialog
    Given the viewer is opened with a publication with attribution labels
    Then the viewer should meet all accessibility criteria

  @Ignore
  Scenario: Accessibility in contents dialog
    Given the viewer is opened with a publication
    And the viewer is in dashboard view
    And the viewer is in table of contents view
    Then the viewer should meet all accessibility criteria

  @Ignore
  Scenario: Accessibility in contents dialog
    Given the viewer is opened with a publication
    And the viewer is in dashboard view
    And the user opens the search dialog
    Then the viewer should meet all accessibility criteria
