@access-keys @desktop
Feature: Access Keys
  In order to navigate
  As a user
  I want to be able to nagivate in the viewer with keyboard keys

  Scenario Outline: Next Page on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    When the user hits key <keys>
    Then the viewer should go to next page

    Examples:
      | keys       |
      | PageDown   |
      | ArrowRight |

  Scenario Outline: Previous Page on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals" on page 5
    When the user hits key <keys>
    Then the viewer should go to previous page

    Examples:
      | keys      |
      | PageUp    |
      | ArrowLeft |

  Scenario Outline: Last Page on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    When the user hits key <keys>
    Then the viewer should go to last page

    Examples:
      | keys |
      | End  |

  Scenario Outline: First Page on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals" on page 5
    When the user hits key <keys>
    Then the viewer should go to first page

    Examples:
      | keys |
      | Home |

  Scenario Outline: Zoom In on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    When the user hits key <keys>
    Then the current zoom level has increased

    Examples:
      | keys |
      | +    |

  Scenario Outline: Zoom Out on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the view is zoomed in
    When the user hits key <keys>
    Then the current zoom level has decreased

    Examples:
      | keys |
      | -    |

  Scenario Outline: Zoom Home on key <keys>
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the view is zoomed in
    When the user hits key <keys>
    Then the current zoom level is home

    Examples:
      | keys |
      |    0 |

  Scenario Outline: Open Content Search Dialog
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the user hits key <keys>
    Then the content search dialog should open

    Examples:
      | keys |
      | s    |

  Scenario Outline: Close Content Search Dialog
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the content search dialog is open
    When the user hits key <keys>
    Then the content search dialog should close

    Examples:
      | keys   |
      | Escape |

  Scenario Outline: Open information Dialog
    Given the viewer is opened with a publication with viewing hint "individuals"
    When the user hits key <keys>
    Then the information dialog should open

    Examples:
      | keys |
      | c    |

  Scenario Outline: Close information Dialog
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the information dialog is open
    When the user hits key <keys>
    Then the information dialog should close

    Examples:
      | keys   |
      | Escape |

  Scenario Outline: Close Content Search Dialog when other dialog is opening
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    And the user search for the word "africa"
    When the user click in the viewer
    And the user hits key <keys>
    Then the content search dialog should close
    And the information dialog should open

    Examples:
      | keys |
      | c    |

  Scenario Outline: Close information Dialog when other dialog is opening
    Given the viewer is opened with a publication with viewing hint "individuals"
    And the information dialog is open
    When the user hits key <keys>
    Then the information dialog should close
    And the content search dialog should open

    Examples:
      | keys |
      | s    |

  Scenario Outline: Reset search on key <keys>
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    When the user search for the word "africa"
    And the user closes the search dialog
    When the user hits key <keys>
    And the user opens the search dialog
    Then the search query should be empty

    Examples:
      | keys    |
      | Shift+S |

  Scenario Outline: Disable <keys> when Content Search Dialog is open
    Given the viewer is opened with a publication with viewing hint "individuals" on page 5
    And the content search dialog is open
    When the user hits key <keys>
    Then the viewer should not change page

    Examples:
      | keys       |
      | ArrowRight |
      | n          |
      | ArrowLeft  |
      | p          |
      | Home       |
      | End        |

  Scenario Outline: Next hit on <keys>
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    And the user search for the word "africa"
    And the user closes the search dialog
    When the user hits key <keys>
    Then the page with hit number 1 should be displayed

    Examples:
      | keys |
      | n    |

  Scenario Outline: Previous hit on <keys>
    Given the viewer is opened with a publication with the word "africa" 7 times inside
    And the viewer is in dashboard view
    And the user search for the word "africa"
    And the user has selected the second hit
    And the user closes the search dialog
    When the user hits key <keys>
    Then the page with hit number 1 should be displayed

    Examples:
      | keys |
      | p    |

  Scenario Outline: Open recognized text content
    Given the viewer is opened with a publication with recognized text content
    When the user hits key <keys>
    Then both the digital pages and the recognized text content should be shown

    Examples:
      | keys |
      | t    |
