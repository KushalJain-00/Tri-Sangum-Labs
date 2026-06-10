# backend/app/services/email_service.py — Resend email integration (Design Doc Section 13.1)
import resend
from app.config import settings

FROM_EMAIL = "hello@trisangumlabs.com"


def _init_resend():
    resend.api_key = settings.RESEND_API_KEY


async def send_contribution_received(
    owner_email: str, contributor_name: str, project_title: str, message_preview: str
):
    """Email to project owner when they receive a contribution request."""
    _init_resend()
    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": owner_email,
        "subject": f"Someone wants to contribute to {project_title}",
        "html": f"""
            <h2>New contribution request</h2>
            <p><strong>{contributor_name}</strong> wants to contribute to <strong>{project_title}</strong>.</p>
            <p>"{message_preview[:200]}"</p>
            <a href="https://trisangumlabs.com/dashboard"
               style="display:inline-block;padding:12px 28px;background:#1D4ED8;color:#fff;
                      text-decoration:none;border-radius:9999px;font-weight:600;">
                View Request
            </a>
        """,
    })


async def send_contribution_accepted(
    contributor_email: str, owner_name: str, project_title: str, project_id: str
):
    """Email to contributor when their request is accepted."""
    _init_resend()
    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": contributor_email,
        "subject": f"You have been accepted to {project_title}",
        "html": f"""
            <h2>You're in!</h2>
            <p><strong>{owner_name}</strong> accepted your request to join <strong>{project_title}</strong>.</p>
            <a href="https://trisangumlabs.com/projects/{project_id}"
               style="display:inline-block;padding:12px 28px;background:#1D4ED8;color:#fff;
                      text-decoration:none;border-radius:9999px;font-weight:600;">
                View Project
            </a>
        """,
    })


async def send_contribution_declined(contributor_email: str, project_title: str):
    """Email to contributor when their request is declined — friendly tone."""
    _init_resend()
    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": contributor_email,
        "subject": "Update on your contribution request",
        "html": f"""
            <h2>Update on your request</h2>
            <p>The owner of <strong>{project_title}</strong> has reviewed your request and decided to go in a different direction.</p>
            <p>There are plenty of other projects looking for contributors like you.</p>
            <a href="https://trisangumlabs.com/projects"
               style="display:inline-block;padding:12px 28px;background:#1D4ED8;color:#fff;
                      text-decoration:none;border-radius:9999px;font-weight:600;">
                Browse Projects
            </a>
        """,
    })


async def send_welcome(user_email: str, full_name: str):
    """Welcome email on registration."""
    _init_resend()
    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": user_email,
        "subject": "Welcome to TriSangum Labs",
        "html": f"""
            <h2>Welcome, {full_name}!</h2>
            <p>You're now part of a community where builders find builders.</p>
            <a href="https://trisangumlabs.com/projects"
               style="display:inline-block;padding:12px 28px;background:#1D4ED8;color:#fff;
                      text-decoration:none;border-radius:9999px;font-weight:600;">
                Browse Projects
            </a>
        """,
    })


async def send_password_reset(user_email: str, reset_link: str):
    """Password reset email."""
    _init_resend()
    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": user_email,
        "subject": "Reset your TriSangum password",
        "html": f"""
            <h2>Reset your password</h2>
            <p>Click the button below to reset your password. This link expires in 1 hour.</p>
            <a href="{reset_link}"
               style="display:inline-block;padding:12px 28px;background:#1D4ED8;color:#fff;
                      text-decoration:none;border-radius:9999px;font-weight:600;">
                Reset Password
            </a>
        """,
    })
