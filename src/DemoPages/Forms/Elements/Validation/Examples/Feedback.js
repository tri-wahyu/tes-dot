import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Button, Card, CardBody, Row, Col,
    CardTitle, Form, FormGroup, Label, Input, FormFeedback, FormText
} from 'reactstrap';
import { Table } from 'reactstrap';
import { isSunday } from 'date-fns';

export default class FormsFeedback extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            valid: {},
            invalid: {
                'nama': true,
                'makanan': true,
                'ongkir': true,
                'jumlah': true,
                'disc': true,
            },
            listMakanan: [
                { "value": "Soto|10000", "label": "Soto Rp. 10.000" },
                { "value": "Ayam Geprek|20000", "label": "Ayam Geprek Rp. 20.000" },
                { "value": "Ayam Goreng|15000", "label": "Ayam Goreng Rp. 15.000" }
            ],
            listDisc: [
                { "label": "30% maks Rp 50.000", "value": "30|50000" },
                { "label": "10% maks Rp 20.000", "value": "10|20000" },
                { "label": "15% maks Rp 25.000", "value": "15|25000" },
                { "label": "5% maks Rp 10.000", "value": "5|10000" }
            ],
            daftar: []
        }
    }
    calculate(e) {
        e.preventDefault();
        let fields = this.state.fields;
        let daftar = this.state.daftar;
        let totalA = Number((Number(fields['makanan'].split('|')[1]) * fields['jumlah'])) + Number(fields['ongkir']);
        let disc = (Number(fields['disc'].split('|')[0]) / 100) * totalA;
        let maks = Number(fields['disc'].split('|')[1]);
        let totDisc = disc <= maks ? Number(disc) : Number(maks);
        fields['tot'] = totalA - totDisc;
        let data= {
            nama:fields['nama'],
            makanan:fields['makanan'].split('|')[0],
            harga:fields['makanan'].split('|')[1],
            jumlah:fields['jumlah'],
            ongkir:fields['ongkir'],
            discName: fields['disc'].split('|')[0]+'% maks Rp.'+fields['disc'].split('|')[1], 
            disc: totDisc,
            total:fields['tot']
        }
        daftar.push(data);
        this.setState({ daftar });
        this.clear();
    }
    clear() {
        let fields = {
            'nama': '',
            'makanan': '',
            'ongkir': '',
            'jumlah': '',
            'disc': '',
        };
        let valid = {};
        let invalid = {
            'nama': true,
            'makanan': true,
            'ongkir': true,
            'jumlah': true,
            'disc': true,
        };
        this.setState({ fields });
        this.setState({ valid });
        this.setState({ invalid });
    }
    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        let isNumber = isNaN(fields[field]);
        let valid = this.state.valid;
        valid[field] = !fields[field] ? false : isNumber && fields[field] < 0 ? false : true;
        this.setState({ valid });
        let invalid = this.state.invalid;
        invalid[field] = !fields[field] ? true : isNumber && fields[field] < 0 ? true : false;
        this.setState({ invalid });
    }
    makananOption() {
        return
    }
    findValue() {
        let o = this.state.invalid;
        for (var prop in o) {
            if (o.hasOwnProperty(prop) && o[prop] === true) {
                return true;
            }
        }
        return false;
    }
    render() {
        var isValid = this.findValue();
        var makananOpt = this.state.listMakanan.map(function (food) {
            return <option value={food.value}>{food.label}</option>
        });
        var discOpt = this.state.listDisc.map(function (disc) {
            return <option value={disc.value}>{disc.label}</option>
        });
        var daftar = this.state.daftar.map(function (x) {
            return <tr>
                <th>{x.nama}</th>
                <th>{x.makanan}</th>
                <th>Rp. {x.harga}</th>
                <th>{x.jumlah}</th>
                <th>Rp. {x.ongkir}</th>
                <th>{x.discName}</th>
                <th>Rp. {x.disc}</th>
                <th>Rp. {x.total}</th>
            </tr>
        });
        var total = this.state.daftar.reduce((tot,x)=>tot+x.total,0);
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <Row>
                            <Col md="12">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>Perhitungan Total</CardTitle>
                                        <Form >
                                            <FormGroup>
                                                <Label for="nama">Nama</Label>
                                                <Input onChange={this.handleChange.bind(this, "nama")} value={this.state.fields["nama"]} id="nama" valid={this.state.valid['nama']} invalid={this.state.invalid['nama']}>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="makanan">Makanan</Label>
                                                <Input type="select" name="select" onChange={this.handleChange.bind(this, "makanan")} value={this.state.fields["makanan"]} id="makanan" valid={this.state.valid['makanan']} invalid={this.state.invalid['makanan']}>
                                                    <option value=''>Nothing Selected</option>
                                                    {makananOpt}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="harga">Jumlah Pesanan</Label>
                                                <Input id="harga" type="number" onChange={this.handleChange.bind(this, "jumlah")} value={this.state.fields["jumlah"]} valid={this.state.valid['jumlah']} invalid={this.state.invalid['jumlah']} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="ongkir">Ongkir</Label>
                                                <Input id="ongkir" type="number" onChange={this.handleChange.bind(this, "ongkir")} value={this.state.fields["ongkir"]} valid={this.state.valid['ongkir']} invalid={this.state.invalid['ongkir']} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="diskon">Diskon</Label>
                                                <Input id="diskon"  type="select" onChange={this.handleChange.bind(this, "disc")} name="select" value={this.state.fields["disc"]} valid={this.state.valid['disc']} invalid={this.state.invalid['disc']}>
                                                    <option value=''>Nothing Selected</option>
                                                    {discOpt}
                                                </Input>
                                            </FormGroup>
                                        </Form>
                                        <Button disabled={isValid} color="primary" onClick={this.calculate.bind(this)} className="mt-1">Save</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="12">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>List Data Pembayaran</CardTitle>
                                        <Table className="mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Nama</th>
                                                    <th>Makanan</th>
                                                    <th>Harga</th>
                                                    <th>Jumlah Pesanan</th>
                                                    <th>Ongkir</th>
                                                    <th>Diskon Name</th>
                                                    <th>Diskon</th>
                                                    <th>Total Bayar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {daftar}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan='7'>Total</td>
                                                    <td>Rp. {total} </td>
                                                </tr>
                                            </tfoot>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}
