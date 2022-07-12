import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";

import { Button } from "@progress/kendo-react-buttons";
import { savePDF } from "@progress/kendo-react-pdf";
import { DonutChartContainer } from "./components/DonutChartContainer";
import { BarChartContainer } from "./components/BarChartContainer";
import GridContainer from "./components/GridContainer";
import PanelBarContainer from "./components/PanelBarContainer";

import "@progress/kendo-theme-material/dist/all.css";
import "./styles.css";

class App extends Component {
  render() {
    return (
      <div className="app-container" ref={el => (this.appContainer = el)}>
        <header className="header row">
          <div className="col-xs-7  col-sm-7  col-md-7  col-lg-5 col-xl-5 text-center text-sm-left">
            <h1>Vendas | 2018 Q4</h1>
          </div>
          <div className="col-xs-12  col-sm-5  col-md-5  col-lg-7 col-xl-7 text-center text-sm-right">
            <Button
              className="button"
              primary={true}
              onClick={this.handleShare}
            >
              Compartilhar
            </Button>
            <Button className="button" onClick={this.handlePDFExport}>
              Exportar para PDF
            </Button>
          </div>
        </header>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
            <PanelBarContainer />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-2 col-xl-2">
                <div className="percentage-container">
                  <span className="percentage-number">94</span>
                  <span className="percentage-sign">%</span>
                  <p>SATISFAÇÃO DO CONSUMIDOR</p>
                </div>
                <div className="percentage-container">
                  <span className="percentage-number">89</span>
                  <span className="percentage-sign">%</span>
                  <p>ALVO DE VENDAS</p>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <DonutChartContainer />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <BarChartContainer />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <GridContainer />
              </div>
            </div>
          </div>
        </div>
        {this.state.showDialog && (
          <Dialog title={"Share this report"} onClose={this.handleShare}>
            <p>Please enter the email address/es of the recipient/s.</p>
            <Input placeholder="example@progress.com" />
            <DialogActionsBar>
              <Button primary={true} onClick={this.handleShare}>
                Share
              </Button>
              <Button onClick={this.handleShare}>Cancel</Button>
            </DialogActionsBar>
          </Dialog>
        )}
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.appContainer = React.createRef();
    this.state = {
      showDialog: false
    };
  }

  handlePDFExport = () => {
    savePDF(ReactDOM.findDOMNode(this.appContainer), { paperSize: "auto" });
  };

  handleShare = () => {
    this.setState(
      {
        showDialog: !this.state.showDialog
      },
      () => console.log(this.state)
    );
  };
}
export default App;
