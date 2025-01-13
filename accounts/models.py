# accounts/models.py
from django.db import models
import uuid


class Account(models.Model):
    account_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False
    )
    # Name field to store the account holder's name
    name = models.CharField(max_length=255, default="Unknown")
    balance = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.account_id}) - Balance: {self.balance}"
