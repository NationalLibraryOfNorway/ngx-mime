Feature: Switch between page and dashboard view
  Scenario: Navigate to page view
    Given the viewer is in dashboard view
    When the user click in the viewer
    Then the viewer should change to page view
