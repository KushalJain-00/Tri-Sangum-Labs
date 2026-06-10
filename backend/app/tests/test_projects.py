# backend/app/tests/test_projects.py
import pytest

@pytest.mark.asyncio
async def test_list_projects_empty(async_client):
    response = await async_client.get("/api/v1/projects")
    assert response.status_code == 200
    data = response.json()
    assert "projects" in data
    assert data["total"] == 0
