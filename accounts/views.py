# accounts/views.py
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Account
from .serializers import AccountSerializer
import csv
from io import StringIO
import logging


# List all accounts


@api_view(['GET'])
def list_accounts(request):
    accounts = Account.objects.all()
    serializer = AccountSerializer(accounts, many=True)
    return Response(serializer.data)

# Get specific account


@api_view(['GET'])
def get_account(request, account_number):
    try:
        account = Account.objects.get(account_id=account_number)
    except Account.DoesNotExist:
        return Response({"error": "Account not found"}, status=404)
    serializer = AccountSerializer(account)
    return Response(serializer.data)

# Transfer funds


@api_view(['POST'])
def transfer_funds(request):
    sender_account_number = request.data.get("sender_account_number")
    recipient_account_number = request.data.get("recipient_account_number")
    amount = request.data.get("amount")

    try:
        # Change account_number to account_id
        sender = Account.objects.get(account_id=sender_account_number)
        recipient = Account.objects.get(account_id=recipient_account_number)
    except Account.DoesNotExist:
        return Response({"error": "Account not found"}, status=404)

    if sender.balance < amount:
        return Response({"error": "Insufficient funds"}, status=400)

    sender.balance -= amount
    recipient.balance += amount
    sender.save()
    recipient.save()

    return Response({"message": "Transfer successful"})


# Import accounts from CSV


logger = logging.getLogger(__name__)


@api_view(['POST'])
def import_accounts(request):
    if 'file' not in request.FILES:
        return Response({"message": "No file provided."}, status=400)

    file = request.FILES['file']
    try:
        # Read and decode the CSV file
        csv_file = file.read().decode("utf-8")
        io_string = StringIO(csv_file)
        reader = csv.DictReader(io_string)  # Use DictReader to handle headers

        # Check for required columns
        expected_columns = ['ID', 'Name', 'Balance']
        if not all(col in reader.fieldnames for col in expected_columns):
            return Response({"message": "CSV file is missing required columns."}, status=400)

        # Process each row
        for row in reader:
            account_id = row['ID']
            name = row['Name']
            balance = row['Balance']

            # Validate and create account
            try:
                balance = float(balance)
                Account.objects.create(
                    account_id=account_id, name=name, balance=balance)
            except ValueError:
                logger.error(f"Invalid balance value in row: {row}")
                return Response({"message": f"Invalid balance value in row: {row}"}, status=400)

        return Response({"message": "Accounts imported successfully"})

    except Exception as e:
        logger.error(f"Error processing the file: {str(e)}")
        return Response({"message": f"Error processing the file: {str(e)}"}, status=400)
