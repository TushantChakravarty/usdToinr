import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export function RatesCard({ rates }) {
    return (
        <Card sx={{
            minWidth: 275, backgroundColor: 'white', color: 'white', display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            marginLeft:10
        }}>

            <div style={{
                display: 'flex',
                backgroundColor: 'black',
                height: '5vh',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width:'10vw'

            }}>


                <Typography variant="h6" component="div" sx={{
                    alignSelf: 'center'
                }} style={{
                    alignSelf: 'center',
                }}>
                    USDT Rate
                </Typography>
            </div>

            <Typography variant="body2" style={{ fontSize: 20, color: 'black', alignSelf: 'center', width:'5vw' }}>
                {rates}
                <br />
            </Typography>




        </Card>
    );
}

export function PendingCard({ Pending }) {
    return (
        <Card sx={{
            minWidth: 275, backgroundColor: 'white', color: 'white', display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
        }}>

            <div style={{
                display: 'flex',
                backgroundColor: 'black',
                height: '5vh',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width:'10vw'

            }}>


                <Typography variant="h6" component="div" sx={{
                    alignSelf: 'center'
                }} style={{
                    alignSelf: 'center',
                }}>
                    Pending orders
                </Typography>
            </div>

            <Typography variant="body2" style={{ fontSize: 20, color: 'black', alignSelf: 'center', width:'5vw' }}>
                {Pending ? Pending : 0}
                <br />
            </Typography>




        </Card>
    );
}

export function Last24HrCard({ data }) {
    return (
        <Card sx={{
            minWidth: 275, backgroundColor: 'white', color: 'white', display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            marginLeft:10

        }}>

            <div style={{
                display: 'flex',
                backgroundColor: 'black',
                height: '5vh',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width:'10vw'

            }}>


                <Typography variant="h6" component="div" sx={{
                    alignSelf: 'center'
                }} style={{
                    alignSelf: 'center',
                }}>
                    Total Wallet
                </Typography>
            </div>

            <Typography variant="body2" style={{ fontSize: 20, color: 'black', alignSelf: 'center', width:'5vw' }}>
                ${data?data:0}
                <br />
            </Typography>




        </Card>
    );
}
export const ReusableCard = ({title,data})=>{
    return (
        <Card sx={{
            minWidth: 275, backgroundColor: 'white', color: 'white', display: 'flex',
            flexDirection: 'row',
            marginTop: 10,

        }}>

            <div style={{
                display: 'flex',
                backgroundColor: 'black',
                height: '5vh',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width:'10vw'

            }}>


                <Typography variant="h6" component="div" sx={{
                    alignSelf: 'center'
                }} style={{
                    alignSelf: 'center',
                }}>
                    {title}
                </Typography>
            </div>

            <Typography variant="body2" style={{ fontSize: 20, color: 'black', alignSelf: 'center', width:'5vw' }}>
                {data?data:0}
                <br />
            </Typography>




        </Card>
    )
}
export const ReusableCardMargin = ({title,data})=>{
    return (
        <Card sx={{
            minWidth: 275, backgroundColor: 'white', color: 'white', display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            marginLeft:10

        }}>

            <div style={{
                display: 'flex',
                backgroundColor: 'black',
                height: '5vh',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width:'10vw'

            }}>


                <Typography variant="h6" component="div" sx={{
                    alignSelf: 'center'
                }} style={{
                    alignSelf: 'center',
                }}>
                    {title}
                </Typography>
            </div>

            <Typography variant="body2" style={{ fontSize: 20, color: 'black', alignSelf: 'center', width:'5vw' }}>
                {data?data:0}
                <br />
            </Typography>




        </Card>
    )
}

export const ReusableCardDollar = ({title,data})=>{
    return (
        <Card sx={{
            minWidth: 275, backgroundColor: 'white', color: 'white', display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            marginLeft:10

        }}>

            <div style={{
                display: 'flex',
                backgroundColor: 'black',
                height: '5vh',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width:'10vw'

            }}>


                <Typography variant="h6" component="div" sx={{
                    alignSelf: 'center'
                }} style={{
                    alignSelf: 'center',
                }}>
                    {title}
                </Typography>
            </div>

            <Typography variant="body2" style={{ fontSize: 20, color: 'black', alignSelf: 'center', width:'5vw' }}>
                ${data?data:0}
                <br />
            </Typography>




        </Card>
    )
}
