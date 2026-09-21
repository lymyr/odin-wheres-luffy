# todo: revise later

## backend
### details
- Integration and unit testing via Supertest and Jest
- Uses JWT to forbid client to touch game progress
- `GET /:gameId` sends JWT with fresh persons array and startDate
- `POST /:gameId` recieves payload with 'clicked person', click coordinates, and the recieved JWT from server. Server responds back with JWT and includes endTime property if the `persons` array is empty.
- `GET /:gameId/leaderboard` sends leaderboard
- `POST /:gameId/leaderboard` server validates username and JWT. If  username is valid and `persons` array is empty, then it creates a leaderboard record.

## frontend
- Normalizes click coordinates by using this logic: (xPixel clicked - imageOffsetX) / imageWidth
- Responsive box and dropdown based on click coordinates, image size, and box/dropdown size
- State dependent UI styles with animation

## setup
### database
- create dev and test databases
- `cd backend` from project root then run `npm run devSetup && npm run testSetup` to perform migrations, generate prisma client, and add game to database