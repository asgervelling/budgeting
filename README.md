## Daily budget and savings CLI tool with Node
A command line interface for managing private expenses
in a spending and a savings account, respectively. \
You can enter your balance, as well as daily goal budget. \
The program will show you what you can spend and what you can save.

### Installation
```
git clone git@github.com:asgervelling/budgeting.git
cd budgeting && tsc
chmod +x run.sh
```

### Run
```
$ ./run.sh
Usage: main [options] [command]

Options:
  -h, --help        display help for command

Commands:
  balance <amount>  Enter your current balance
  budget [options]  See your budget for today
  goal <amount>     Set your daily goal budget
  help [command]    display help for command
```