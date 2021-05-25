@desktop @Ignore-firefox
Feature: Access Keys
  In order to navigate
  As a user
  I want to be able to nagivate in the viewer with keyboard keys

  Scenario Outline: Next Page on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the user hits key <keys>
    Then the viewer should go to next page

    Examples:
      | keys        |
      | PageDown    |
      | ArrowRight  |

  Scenario Outline: Previous Page on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the viewer is on page 5
    And the user hits key <keys>
    Then the viewer should go to previous page

    Examples:
      | keys      |
      | PageUp    |
      | ArrowLeft |

  Scenario Outline: Last Page on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the user hits key <keys>
    Then the viewer should go to last page

    Examples:
      | keys  |
      | End   |

  Scenario Outline: First Page on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the viewer is on page 5
    And the user hits key <keys>
    Then the viewer should go to first page

    Examples:
      | keys  |
      | Home  |

  Scenario Outline: Zoom In on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the user hits key <keys>
    Then the current zoom level has increased

    Examples:
      | keys  |
      | +     |

  Scenario Outline: Zoom Out on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the view is zoomed in
    And the user hits key <keys>
    Then the current zoom level has decreased

    Examples:
      | keys  |
      | -     |

  Scenario Outline: Zoom Home on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the view is zoomed in
    And the user hits key <keys>
    Then the current zoom level is home

    Examples:
      | keys  |
      | 0     |

  Scenario Outline: Open Content Search Dialog
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the user hits key <keys>
    Then the content search dialog should open

    Examples:
      | keys  |
      | s     |

  Scenario Outline: Close Content Search Dialog
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the content search dialog is open
    And the user hits key <keys>
    Then the content search dialog should close

    Examples:
      | keys  |
      | Esc   |

  Scenario Outline: Open Contents Dialog
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the user hits key <keys>
    Then the contents dialog should open

    Examples:
      | keys  |
      | c     |

  Scenario Outline: Close Contents Dialog
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the contents dialog is open
    And the user hits key <keys>
    Then the contents dialog should close

    Examples:
      | keys  |
      | Esc   |

  Scenario Outline: Close Content Search Dialog when other dialog is opening
    Given the viewer is opened with a publication with the word "Gjallarhorn" 45 times inside
    And the viewer is in dashboard view
    And the user search for the word "Gjallarhorn"
    And the user hits key <keys>
    Then the content search dialog should close
    And the contents dialog should open

    Examples:
      | keys  |
      | c     |

  Scenario Outline: Close Contents Dialog when other dialog is opening
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the contents dialog is open
    And the user hits key <keys>
    Then the contents dialog should close
    And the content search dialog should open

    Examples:
      | keys  |
      | s     |

  Scenario Outline: Disable <keys> when Content Search Dialog is open
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the viewer is on page 5
    And the content search dialog is open
    And the user hits key <keys>
    Then the viewer should not change page

    Examples:
      | keys        |
      | ArrowRight  |
      | n           |
      | ArrowLeft   |
      | p           |
      | Home        |
      | End         |

    Scenario Outline: Next hit on <keys>
      Given the viewer is opened with a publication with the word "Gjallarhorn" 45 times inside
      And the viewer is in dashboard view
      And the user search for the word "Gjallarhorn"
      And the user closes the search dialog
      And the user hits key <keys>
      Then the page with hit number 1 should be displayed

      Examples:
        | keys        |
        | n           |

    Scenario Outline: Previous hit on <keys>
      Given the viewer is opened with a publication with the word "Gjallarhorn" 45 times inside
      And the viewer is in dashboard view
      And the user search for the word "Gjallarhorn"
      And the user has selected the second hit
      And the user closes the search dialog
      And the user hits key <keys>
      Then the page with hit number 1 should be displayed

      Examples:
        | keys        |
        | p           |
