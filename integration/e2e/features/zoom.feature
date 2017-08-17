Feature: Zoom
  In order to view high quality images in great detail
  As a user
  I want to be able to zoom an image in and out at any level

  Background:
    Given the viewer is opened with a publication
    And the viewer is in page view

  @Mobile
  Scenario: Zooming in on mobile
    When the user pinch out
    Then the current zoom level has increased

#  @Ignore
#  @Mobile
#  Scenario: Zooming out on mobile
#    And the view is zoomed in
#    When the user pinch
#    Then the current zoom level has decreased
#
#  @Ignore
#  @Desktop
#  Scenario: Zooming in on desktop
#    When the user click zoom in button
#    Then the current zoom level has increased
#
#  @Ignore
#  @Desktop
#  Scenario: Zooming out on desktop
#    And the view is zoomed in
#    When the user click zoom out button
#    Then the current zoom level has decreased
#
#  @Ignore
#  @Mobile @Desktop
#  Scenario: Auto zooming in on desktop
#    And the view is all zoomed out
#    When the user double click
#    Then the current zoom level has increased
#
#  @Ignore
#  @Mobile @Desktop
#  Scenario: Auto zooming out on desktop
#    And the view is zoomed in
#    When the user double click
#    Then the view is all zoomed out
