Feature: Zoom
  In order to view high quality images in great detail
  As a user
  I want to be able to zoom an image in and out at any level

  Background:
    Given the viewer is opened with a publication

  #
  # Pinch actions
  #
  # TODO Ignoring this until we find out how to use TouchActions
  @Ignore
  @mobile
  Scenario: Zooming in on mobile
    Given zoom level is home
    When the user pinch out
    Then the current zoom level has increased

  # TODO Ignoring this until we find out how to use TouchActions
  @Ignore
  @mobile
  Scenario: Zooming out on mobile
    Given the view is zoomed in
    When the user pinch out
    Then the current zoom level has increased

  # TODO Ignoring this until we find out how to use TouchActions
  @Ignore
  @mobile
  Scenario: Zooming out on mobile
    Given the view is zoomed in
    When the user pinch in
    Then the current zoom level has decreased

  #
  # Click Actions
  #

  # TODO Ignoring this until we find out how to use Actions
  @Ignore
  @mobile
  Scenario: Auto zooming in on mobile
    Given zoom level is home
    When the user double taps
    Then the current zoom level has increased

  # TODO Ignoring this until we find out how to use Actions
  @Ignore
  @mobile
  Scenario: Auto zooming out on mobile
    Given the view is zoomed in
    When the user double taps
    Then the current zoom level is home
    And the view should be vertically centered

  # TODO Ignoring this until we find out how to use Actions
  @Ignore
  @desktop
  Scenario: Auto zooming in on desktop
    Given zoom level is home
    When the user double click
    Then the current zoom level has increased

  # TODO Ignoring this until we find out how to use Actions
  @Ignore
  @desktop
  Scenario: Auto zooming out on desktop
    Given the view is zoomed in
    When the user double click
    Then the current zoom level is home
    And the view should be vertically centered

  #
  # Button actions
  #

  @desktop
  Scenario: Zooming in on desktop
    Given zoom level is home
    When the user click zoom in button
    Then the current zoom level has increased

  @desktop
  Scenario: Zooming out on desktop from home
    Given zoom level is home
    When the user click zoom out button
    Then the current zoom level is home

  @desktop
  Scenario: Zooming out on desktop
    Given the view is zoomed in
    When the user click zoom out button
    Then the current zoom level has decreased
