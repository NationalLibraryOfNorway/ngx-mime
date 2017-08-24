Feature: Zoom
  In order to view high quality images in great detail
  As a user
  I want to be able to zoom an image in and out at any level

  Background:
    Given the viewer is opened with a publication
    And the viewer should be displayed

  #
  # Pinch actions
  #
  @Mobile
  Scenario: Zooming in on mobile
    And zoom level is home
    When the user pinch out
    Then the current zoom level has increased

  @Mobile
  Scenario: Zooming out on mobile
    And the view is zoomed in
    When the user pinch out
    Then the current zoom level has increased

  @Mobile
  Scenario: Zooming out on mobile
    And the view is zoomed in
    When the user pinch in
    Then the current zoom level has decreased

  #
  # Click Actions
  #
  @Mobile
  Scenario: Zooming in on mobile
    And zoom level is home
    When the user double click
    Then the current zoom level has increased

  @Mobile
  Scenario: Zooming out on mobile
    And the view is zoomed in
    When the user double click
    Then the current zoom level is home

  @Mobile @Desktop
  Scenario: Auto zooming in on desktop
    And the view is all zoomed out
    When the user double click
    Then the current zoom level has increased

  @Mobile @Desktop
  Scenario: Auto zooming out on desktop
    And the view is zoomed in
    When the user double click
    Then the view should be all zoomed out

  #
  # Button actions
  #
  @Desktop
  Scenario: Zooming in on desktop
    And zoom level is home
    When the user click zoom in button
    Then the current zoom level has increased

  @Desktop
  Scenario: Zooming out on desktop
    And zoom level is home
    When the user click zoom out button
    Then the current zoom level has decreased
