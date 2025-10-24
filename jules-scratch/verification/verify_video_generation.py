from playwright.sync_api import Page, expect

def test_video_generation_page(page: Page):
    # Navigate to the video generation page
    page.goto("file:///app/creative-suite-ai/build/index.html#/video-generation")

    # Check that the upload buttons are visible
    expect(page.get_by_role("button", name="Upload First Frame")).to_be_visible()
    expect(page.get_by_role("button", name="Upload Last Frame")).to_be_visible()

    # Take a screenshot for visual verification
    page.screenshot(path="jules-scratch/verification/verification.png")
