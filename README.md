# Angular and Django Routing Configuration

This project uses both Angular's `RouterModule` and Django's URL routing to manage the frontend and backend routes. Below is an overview of the routes and the components associated with each one in both the frontend (Angular) and the backend (Django).

## Frontend: Angular Routes

The `routes` are configured in the Angular application as follows:

### 1. **Home Page (Accounts List)**

- **Path**: `/`
- **Component**: `AccountsListComponent`
- **Description**: The default route that displays a list of all accounts.

### 2. **Import Accounts**

- **Path**: `/import`
- **Component**: `ImportAccountsComponent`
- **Description**: This route allows users to import accounts from a file (e.g., CSV) to the system.

### 3. **Transfer Funds**

- **Path**: `/transfer-funds`
- **Component**: `TransferFundsComponent`
- **Description**: This route allows users to transfer funds between accounts.

### 4. **Account Details**

- **Path**: `/account/:account_number`
- **Component**: `AccountComponent`
- **Description**: This route displays the details of a specific account identified by its `account_number`.

### Example Angular Routing Configuration

```typescript
import { Routes } from "@angular/router";
import { AccountsListComponent } from "./accounts-list/accounts-list.component";
import { ImportAccountsComponent } from "./import-accounts/import-accounts.component";
import { TransferFundsComponent } from "./transfer-funds/transfer-funds.component";
import { AccountComponent } from "./account/account.component";

export const routes: Routes = [
  { path: "", component: AccountsListComponent },
  { path: "import", component: ImportAccountsComponent },
  { path: "transfer-funds", component: TransferFundsComponent },
  { path: "account/:account_number", component: AccountComponent },
];
```

### Explanation of Components

1. **AccountsListComponent**:

   - Displays a list of all accounts in the system.

2. **ImportAccountsComponent**:

   - Allows importing of account data from a file.

3. **TransferFundsComponent**:

   - Provides a form to transfer funds between accounts.

4. **AccountComponent**:
   - Displays detailed information about a specific account, which is identified by the `account_number` parameter in the URL.

---

## Backend: Django URLs

The Django backend defines routes for interacting with accounts and performing actions like listing accounts, viewing details, transferring funds, and importing account data. The URL configuration is defined in `accounts/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('accounts/', views.list_accounts),  # Lists all accounts
    path('accounts/<str:account_number>/', views.get_account),  # Gets details for a specific account
    path('transfer/', views.transfer_funds),  # Initiates a fund transfer
    path('import/', views.import_accounts),  # Imports accounts from a file
]
```

### Explanation of Django Views

1. **list_accounts**:

   - Lists all accounts stored in the system.

2. **get_account**:

   - Displays detailed information for a specific account identified by `account_number`.

3. **transfer_funds**:

   - Allows transferring funds between accounts.

4. **import_accounts**:
   - Imports account data from a provided file (e.g., CSV).

---

## Running the Application

To run the application, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repository.git
```

### 2. Install dependencies for the Angular project:

```bash
cd your-repository
npm install
```

### 3. Install dependencies for the Django project:

Make sure you are in the backend directory and install dependencies using Pipenv:

```bash
cd your-repository/backend
pipenv install
```

### 4. Apply Django migrations:

```bash
python manage.py migrate
```

### 5. Start the Angular development server:

```bash
cd your-repository
ng serve
```

### 6. Start the Django development server:

```bash
cd your-repository/backend
pipenv run python manage.py runserver
```

### 7. Open your browser and navigate to `http://localhost:4200` to view the Angular frontend and `http://localhost:8000` for the Django backend.

---

## Conclusion

This routing setup allows smooth communication between the frontend (Angular) and backend (Django) parts of the application. Angular handles the UI and user navigation, while Django serves as the backend API for account management, fund transfers, and importing data.

Feel free to contribute or make modifications as necessary to suit your project's needs!
