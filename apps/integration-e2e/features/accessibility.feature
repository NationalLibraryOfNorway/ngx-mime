@Accessibility
@android @iphone @desktop
Feature: Accessibility
    To have the same opportunity for use
    As a person with disabilities
    Then I want the viewer to be universally designed

  Scenario: Accessibility in dashboard view
    Given the viewer is opened with a publication without attribution labels
    And the viewer is in dashboard view
    Then the viewer should meet all accessibility criteria

  Scenario: Accessibility in page view
    Given the viewer is opened with a publication without attribution labels
    And the viewer is in page view
    Then the viewer should meet all accessibility criteria

  Scenario: Accessibility in attribution dialog
    Given the viewer is opened with a publication with attribution labels
    Then the viewer should meet all accessibility criteria

  Scenario: Accessibility in contents dialog
    Given the viewer is opened with a publication
    And the viewer is in dashboard view
    And the viewer is in table of contents view
    Then the viewer should meet all accessibility criteria

  Scenario: Accessibility in search dialog
    Given the viewer is opened with a publication
    And the viewer is in dashboard view
    And the user opens the search dialog
    Then the viewer should meet all accessibility criteria

  @elements
  Scenario Outline: Accessibility in dashboard view for elements in <mode> mode
    Given the viewer is opened with a publication in HTML
    And the viewer is in <mode> mode
    And the viewer is in dashboard view
    Then the viewer should meet all accessibility criteria

    Examples:
      | mode        |
      | light       |
      | dark        |

  @elements
  Scenario Outline: Accessibility in page view for elements
    Given the viewer is opened with a publication in HTML
    And the viewer is in <mode> mode
    And the viewer is in page view
    Then the viewer should meet all accessibility criteria

    Examples:
      | mode        |
      | light       |
      | dark        |

  @elements
  Scenario Outline: Accessibility in attribution dialog for elements
    Given the viewer is opened with a publication in HTML with attribution labels
    And the viewer is in <mode> mode
    Then the viewer should meet all accessibility criteria

    Examples:
      | mode        |
      | light       |
      | dark        |

  @elements
  Scenario Outline: Accessibility in contents dialog for elements
    Given the viewer is opened with a publication in HTML
    And the viewer is in <mode> mode
    And the viewer is in dashboard view
    And the viewer is in table of contents view
    Then the viewer should meet all accessibility criteria

    Examples:
      | mode        |
      | light       |
      | dark        |

  @elements
  Scenario Outline: Accessibility in search dialog for elements
    Given the viewer is opened with a publication in HTML
    And the viewer is in <mode> mode
    And the viewer is in dashboard view
    And the user opens the search dialog
    Then the viewer should meet all accessibility criteria

    Examples:
      | mode        |
      | light       |
      | dark        |
