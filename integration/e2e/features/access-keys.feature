@desktop @Ignore-firefox
Feature: Access Keys
  In order to navigate
  As a user
  I want to be able to nagivate in the viewer with keyboard keys

  Background:
    Given the viewer is opened with a publication

  Scenario Outline: Next Page on key <keys>
    Given the user hits key <keys>
    Then the viewer should go to next page

    Examples:
      | keys        |
      | PageDown    |
      | ArrowRight  |
      | n           |

  Scenario Outline: Previous Page on key <keys>
    Given the viewer is on page 5
    And the user hits key <keys>
    Then the viewer should go to previous page

    Examples:
      | keys      |
      | PageUp    |
      | ArrowLeft |
      | p         |

  Scenario Outline: Last Page on key <keys>
    Given the user hits key <keys>
    Then the viewer should go to last page

    Examples:
      | keys  |
      | End   |

  Scenario Outline: First Page on key <keys>
    Given the viewer is on page 5
    And the user hits key <keys>
    Then the viewer should go to first page

    Examples:
      | keys  |
      | Home  |

  Scenario Outline: Zoom In on key <keys>
    Given the user hits key <keys>
    Then the current zoom level has increased

    Examples:
      | keys  |
      | +     |

  Scenario Outline: Zoom Out on key <keys>
    Given the view is zoomed in
    Given the user hits key <keys>
    Then the current zoom level has decreased

    Examples:
      | keys  |
      | -     |

  Scenario Outline: Zoom Home on key <keys>
    Given the view is zoomed in
    Given the user hits key <keys>
    Then the current zoom level is home

    Examples:
      | keys  |
      | 0     |

  Scenario: Open Content Search Dialog
    Given the user hits keys Shift, Alt and F
    Then the content search dialog should open

  Scenario: Close Content Search Dialog
    Given the content search dialog is open
    And the user hits keys Shift, Alt and F
    Then the content search dialog should close

  Scenario: Open Contents Dialog
    Given the user hits keys Shift, Alt and C
    Then the contents dialog should open

  Scenario: Close Contents Dialog
    Given the contents dialog is open
    And the user hits keys Shift, Alt and C
    Then the contents dialog should close

  Scenario: Close Content Search Dialog when other dialog is opening
    Given the content search dialog is open
    And the user hits keys Shift, Alt and C
    Then the content search dialog should close
    And the contents dialog should open

  Scenario: Close Contents Dialog when other dialog is opening
    Given the contents dialog is open
    And the user hits keys Shift, Alt and F
    Then the contents dialog should close
    And the content search dialog should open

  Scenario Outline: Disable <keys> when Content Search Dialog is open
    Given the viewer is on page 5
    And the content search dialog is open
    And the user hits key <keys>
    Then the viewer should not change page

    Examples:
      | keys        |
      | PageDown    |
      | ArrowRight  |
      | n           |
      | PageUp      |
      | ArrowLeft   |
      | p           |
      | Home        |
      | End         |
